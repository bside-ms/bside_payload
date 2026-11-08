import type { CollectionBeforeValidateHook } from 'payload';
import { ValidationError } from 'payload';
import type { Redirect } from '@/payload-types';

export interface RedirectInput {
    id?: string;
    from?: string;
    to?: {
        type?: string | null;
        url?: string | null;
        reference?: { relationTo?: string; value?: unknown } | null;
    };
}

export interface OtherRedirect {
    id: string;
    from: string;
    destination?: string;
}

const RESERVED_PREFIXES = ['/api', '/_next'];

const removeOrigin = (url: string, siteUrl: string): string =>
    siteUrl !== '' && url.startsWith(siteUrl) ? url.slice(siteUrl.length) : url;

// Must match `normalizeRedirectPath` on the website.
export const normalizePath = (path: string): string => {
    const clean = (path.trim().split('?')[0] ?? '').split('#')[0] ?? '';
    const lower = clean.toLowerCase().replace(/\/+$/, '');

    return lower === '' && clean.startsWith('/') ? '/' : lower;
};

export const normalizeFrom = (from: string, siteUrl: string): string => normalizePath(removeOrigin(from.trim(), siteUrl));

export const normalizeDestinationUrl = (url: string): string => {
    const trimmed = url.trim();

    return trimmed.startsWith('/') || /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

const isValidExternalUrl = (url: string): boolean => {
    try {
        const { protocol, hostname, username, password } = new URL(url);

        return /^https?:$/.test(protocol) && hostname.includes('.') && username === '' && password === '';
    } catch {
        return false;
    }
};

export const resolveDestination = (url: string, siteUrl: string): string => {
    const destination = removeOrigin(normalizeDestinationUrl(url), siteUrl);

    return destination.startsWith('/') ? normalizePath(destination) : destination;
};

export const findRedirectProblem = (
    redirect: { id?: string; from: string; destination?: string },
    others: Array<OtherRedirect>,
): string | undefined => {
    const { from, destination } = redirect;

    if (!from.startsWith('/') || from.startsWith('//')) {
        return 'Die Quelle muss ein Pfad dieser Website sein, der mit einem einzelnen "/" beginnt (zum Beispiel /mein-link).';
    }

    if (from === '/' || RESERVED_PREFIXES.some((prefix) => from === prefix || from.startsWith(`${prefix}/`))) {
        return 'Diese Quelle ist nicht erlaubt, weil sie die Startseite oder technische Pfade der Website betrifft.';
    }

    const duplicate = others.find((other) => other.id !== redirect.id && other.from === from);
    if (duplicate) {
        return 'Für diese Quelle gibt es bereits eine Weiterleitung.';
    }

    if (destination === undefined || destination === '') {
        return 'Das Weiterleitungsziel fehlt. Bei einer Seite muss sie veröffentlicht sein.';
    }

    const isInternal = destination.startsWith('/') && !destination.startsWith('//');

    if (!isInternal && !isValidExternalUrl(destination)) {
        return 'Das Ziel muss ein Pfad dieser Website (/…) oder eine Webadresse wie www.beispiel.de sein.';
    }

    if (destination === from) {
        return 'Quelle und Ziel sind identisch.';
    }

    if (isInternal && others.some((other) => other.id !== redirect.id && other.from === destination)) {
        return 'Das Ziel leitet selbst weiter. Bitte direkt auf das endgültige Ziel verweisen (Kette oder Schleife).';
    }

    if (others.some((other) => other.id !== redirect.id && other.destination === from)) {
        return 'Eine andere Weiterleitung zeigt auf diese Quelle. Bitte diese Weiterleitung auf das endgültige Ziel ändern (Kette oder Schleife).';
    }

    return undefined;
};

export const validateRedirect: CollectionBeforeValidateHook = async ({ data, originalDoc, req }) => {
    if (!data) {
        return data;
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const input = data as RedirectInput;

    if (typeof input.from === 'string') {
        input.from = normalizeFrom(input.from, siteUrl);
    }

    if (input.to?.type === 'custom' && typeof input.to.url === 'string' && input.to.url !== '') {
        input.to.url = normalizeDestinationUrl(input.to.url);
    }

    const isPublishing = (data as { _status?: string })._status !== 'draft';
    if (!isPublishing || typeof input.from !== 'string') {
        return data;
    }

    const id = originalDoc?.id !== undefined ? String(originalDoc.id) : undefined;

    let destination: string | undefined;
    const { type, url, reference } = input.to ?? {};

    if (type === 'custom' && url) {
        destination = resolveDestination(url, siteUrl);
    }

    if (type === 'reference' && reference?.relationTo === 'pages' && reference.value) {
        const value = reference.value;
        const pageId = typeof value === 'object' && value !== null ? (value as { id?: string }).id : String(value);
        const page = pageId
            ? await req.payload.findByID({ collection: 'pages', id: pageId, depth: 0, req }).catch(() => undefined)
            : undefined;

        if (page && (page as { _status?: string })._status === 'published') {
            destination = `/${(page as { slug?: string }).slug}`;
        }
    }

    const { docs } = await req.payload.find({
        collection: 'redirects',
        where: { _status: { equals: 'published' } },
        limit: 9999,
        depth: 0,
        pagination: false,
        req,
    });

    const others: Array<OtherRedirect> = (docs as unknown as Array<Redirect>).map((doc) => ({
        id: String(doc.id),
        from: normalizeFrom(doc.from, siteUrl),
        destination: doc.to?.type === 'custom' && doc.to.url ? resolveDestination(doc.to.url, siteUrl) : undefined,
    }));

    const problem = findRedirectProblem({ id, from: input.from, destination }, others);

    if (problem) {
        throw new ValidationError({
            collection: 'redirects',
            errors: [{ path: 'from', message: problem }],
        });
    }

    return data;
};

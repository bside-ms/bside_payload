import type { Redirect } from '@/payload-types';

export type RedirectCheckState = 'active' | 'pending' | 'draft' | 'error';

export interface RedirectCheckResult {
    state: RedirectCheckState;
    message: string;
    expected?: string;
    actual?: string | null;
}

const withoutOrigin = (url: string, origin: string): string => (url.startsWith(origin) ? url.slice(origin.length) : url);

export const expectedDestination = (redirect: Redirect, siteUrl: string): string | undefined => {
    const { type, url, reference } = redirect.to ?? {};

    if (type === 'custom' && url) {
        return withoutOrigin(url, siteUrl);
    }

    if (type === 'reference' && typeof reference?.value === 'object' && reference.value !== null) {
        return `/${reference.value.slug}`;
    }

    return undefined;
};

const normalize = (value: string): string => {
    const path = (value.split('?')[0] ?? '').replace(/\/$/, '');

    return path === '' ? '/' : path;
};

/** Asks the live website what it does for the `from` path of a redirect (without following it). */
export const checkRedirect = async (redirect: Redirect, siteUrl: string): Promise<RedirectCheckResult> => {
    if (redirect._status !== 'published') {
        return { state: 'draft', message: 'Entwurf: Die Weiterleitung ist noch nicht veröffentlicht.' };
    }

    const expected = expectedDestination(redirect, siteUrl);
    if (expected === undefined) {
        return { state: 'error', message: 'Das Weiterleitungsziel fehlt oder ist nicht veröffentlicht.' };
    }

    try {
        const source = withoutOrigin(redirect.from, siteUrl);
        const response = await fetch(`${siteUrl}${source}${source.includes('?') ? '&' : '?'}redirect-check=${Date.now()}`, {
            redirect: 'manual',
            signal: AbortSignal.timeout(8000),
        });

        const location = response.headers.get('location');
        const actual = location === null ? null : withoutOrigin(location, siteUrl);

        if (response.status >= 300 && response.status < 400 && actual !== null && normalize(actual) === normalize(expected)) {
            return { state: 'active', message: 'Aktiv: Die Weiterleitung ist live.', expected, actual };
        }

        return {
            state: 'pending',
            message: 'Noch nicht aktiv. Es kann bis zu 60 Sekunden dauern, bis eine Änderung live ist.',
            expected,
            actual,
        };
    } catch (error) {
        return {
            state: 'error',
            message: `Die Website ist nicht erreichbar: ${error instanceof Error ? error.message : 'unbekannter Fehler'}`,
        };
    }
};

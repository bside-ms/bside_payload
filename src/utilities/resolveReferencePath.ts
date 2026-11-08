import type { PayloadRequest } from 'payload';
import kebabCase from 'lodash-es/kebabCase';
import { createNewsSlug } from '@/utilities/createNewsSlug';
import createEventSlug from '@/utilities/createEventSlug';

export const REDIRECT_TARGET_COLLECTIONS = ['pages', 'events', 'news', 'circles'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const buildPath = (collection: string, doc: any): string | undefined => {
    if (collection === 'pages') {
        return doc.breadcrumbs?.at(-1)?.url ?? (doc.slug ? `/${doc.slug}` : undefined);
    }

    if (collection === 'events') {
        return `/events/${createEventSlug(doc.slug, doc.title, doc.id)}`;
    }

    if (collection === 'news') {
        return `/news/${createNewsSlug(doc.slug, doc.id, doc.title)}`;
    }

    if (collection === 'circles') {
        const shortName = typeof doc.organisation === 'object' ? doc.organisation?.shortName : undefined;

        return `/${shortName ?? 'kreise'}/${kebabCase(doc.name)}`;
    }

    return undefined;
};

export const resolveReferencePath = async (req: PayloadRequest, collection: string, value: unknown): Promise<string | undefined> => {
    if (!REDIRECT_TARGET_COLLECTIONS.includes(collection) || !value) {
        return undefined;
    }

    const id = typeof value === 'object' ? (value as { id?: string }).id : String(value);
    if (!id) {
        return undefined;
    }

    const doc = await req.payload.findByID({ collection: collection as 'pages', id, depth: 1, draft: false, req }).catch(() => undefined);

    if (!doc || (doc as { _status?: string })._status === 'draft') {
        return undefined;
    }

    return buildPath(collection, doc);
};

import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload';
import kebabCase from 'lodash-es/kebabCase';
import { createNewsSlug } from '@/utilities/createNewsSlug';
import createEventSlug from '@/utilities/createEventSlug';

export const revalidateWebsite = async (paths: Array<string> = []): Promise<void> => {
    try {
        await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-revalidation-key': process.env.REVALIDATION_KEY ?? '',
            },
            body: JSON.stringify({ paths }),
        });
    } catch (error) {
        console.error('[revalidateWebsite]', error);
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extraPaths = (slug: string, doc: any): Array<string> => {
    if (slug === 'pages') {
        return [doc.breadcrumbs?.at(-1)?.url].filter(Boolean);
    }

    if (slug === 'events') {
        return [`/events/${createEventSlug(doc.slug, doc.title, doc.id)}`];
    }

    if (slug === 'news') {
        return [`/news/${createNewsSlug(doc.slug, doc.id, doc.title)}`];
    }

    if (slug === 'circles') {
        return [`/kreise/${kebabCase(doc.name)}`];
    }

    if (slug === 'redirects') {
        return [doc.from].filter(Boolean);
    }

    return [];
};

export const revalidateAfterChange: CollectionAfterChangeHook = async ({ doc, previousDoc, collection }) => {
    if (doc?._status !== 'published' && previousDoc?._status !== 'published') {
        return;
    }

    await revalidateWebsite(extraPaths(collection.slug, doc));
};

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc, collection }) => {
    if (doc?._status !== 'published') {
        return;
    }

    await revalidateWebsite(extraPaths(collection.slug, doc));
};

export const revalidateGlobal: GlobalAfterChangeHook = async () => {
    await revalidateWebsite();
};

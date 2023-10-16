import * as process from 'process';
import type { AfterChangeHook } from 'payload/dist/collections/config/types';
import type { PayloadRequest } from 'payload/types';

export const formatAppURL = ({ doc }: { doc: { slug: string }}): string => {
    const pathToUse = doc.slug === 'home' ? '' : doc.slug;
    const { pathname } = new URL(`${process.env.PAYLOAD_PUBLIC_SITE_URL}/${pathToUse}`);
    return pathname;
};

// Revalidate the page in the background, so the user doesn't have to wait
// Notice that the hook itself is not async and we are not awaiting `revalidate`.
export const revalidatePage: AfterChangeHook = ({ doc, req }: { req: PayloadRequest, doc: { slug: string} }) => {
    const revalidate = async (): Promise<void> => {
        const url = formatAppURL({ doc });

        try {
            const res = await fetch(
                `${process.env.PAYLOAD_PUBLIC_SITE_URL}/api/revalidate?secret=${process.env.REVALIDATION_KEY}&revalidatePath=${url}`,
            );

            if (res.ok) {
                req.payload.logger.info(`Revalidated path ${url}`);
            } else {
                req.payload.logger.error(`Error revalidating path ${url}`);
            }
        } catch {
            req.payload.logger.error(`Error hitting revalidate route for ${url}`);
        }
    };

    void revalidate();

    return doc;
};

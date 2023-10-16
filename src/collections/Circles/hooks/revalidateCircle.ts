import type { AfterChangeHook } from 'payload/dist/collections/config/types';
import { revalidate } from '../../../utilities/revalidate';

export const revalidateCircle: AfterChangeHook = ({ doc, req: { payload } }) => {
    if (doc._status === 'published') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        void revalidate({ collection: 'circles', payload, slug: doc.slug });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return doc;
};

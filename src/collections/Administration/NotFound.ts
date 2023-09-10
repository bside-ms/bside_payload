import type { CollectionConfig } from 'payload/types';
import { isApiUser } from '../../access/isApiUser';

const NotFoundPages: CollectionConfig = {
    slug: 'not-found-pages',

    labels: {
        singular: '404 Seite',
        plural: '404 Seiten',
    },

    admin: {
        group: 'Automated Collections',
    },

    versions: {
        drafts: true,
    },

    access: {
        create: isApiUser,
        read: isApiUser,
        update: isApiUser,
        delete: isApiUser,
    },

    fields: [
        {
            name: 'slug',
            type: 'text',
            required: true,
        },
    ],
};

export default NotFoundPages;

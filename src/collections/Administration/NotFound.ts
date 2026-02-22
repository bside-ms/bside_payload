import type { CollectionConfig } from 'payload';
import { isAdmin } from '@/access/isAdmin';
import { authorFields, authorFieldsBeforeChangeHook } from '@/fields/authorFields';

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
        create: () => true,
        read: isAdmin,
        update: isAdmin,
        delete: isAdmin,
    },

    hooks: {
        beforeChange: [authorFieldsBeforeChangeHook],
    },

    fields: [
        {
            name: 'slug',
            type: 'text',
            required: true,
        },

        ...authorFields,
    ],
};

export default NotFoundPages;

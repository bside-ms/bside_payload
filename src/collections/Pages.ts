import type { CollectionConfig } from 'payload/types';
import { checkRole } from '../access/checkRole';
import { isAdmin } from '../access/isAdmin';
import { publishedOnly } from '../access/publishedOnly';
import richText from '../fields/richText';
import { slugField } from '../fields/slug';

const Pages: CollectionConfig = {
    slug: 'pages',

    labels: {
        singular: 'Seite',
        plural: 'Seiten',
    },

    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', 'updatedAt'],
    },

    versions: {
        drafts: true,
    },

    access: {
        create: isAdmin,
        read: publishedOnly,
        update: isAdmin,
        delete: isAdmin,
        admin: ({ req: { user } }) => checkRole(user, ['admin']), // eslint-disable-line @typescript-eslint/no-unsafe-argument
    },

    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        richText(),
        slugField(),
    ],
};

export default Pages;

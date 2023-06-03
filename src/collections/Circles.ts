import type { CollectionConfig } from 'payload/types';
import { checkRole } from '../access/checkRole';
import { isAdmin } from '../access/isAdmin';
import { publishedOnly } from '../access/publishedOnly';

const Circles: CollectionConfig = {
    slug: 'circles',

    labels: {
        singular: 'Kreis',
        plural: 'Kreise',
    },

    admin: {
        useAsTitle: 'name',
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
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
        },
        {
            name: 'organisation',
            label: 'Körperschaft',
            type: 'relationship',
            relationTo: 'organisations',
            required: true,
        },
        {
            name: 'color',
            label: 'Akzentfarbe',
            type: 'text',
            required: false,
        },
        {
            name: 'circleImage',
            label: 'Bild',
            type: 'upload',
            relationTo: 'media',
            filterOptions: {
                mimeType: { contains: 'image' },
            },
            admin: {
                description: 'Empfohlen: webp mit 1280x720px',
            },
        },

        {
            name: 'fallbackImage',
            label: 'Fallback-Image',
            type: 'text',
            required: true,
        },
    ],
};

export default Circles;

import path from 'path';
import type { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin';
import { isUser } from '../access/isUser';

const Media: CollectionConfig = {
    slug: 'media',

    access: {
        read: () => true,
        create: isUser,
        update: isUser,
        delete: isAdmin,
    },

    labels: {
        singular: 'Medien',
        plural: 'Medien',
    },

    admin: {
        useAsTitle: 'filename',
        description: 'Uploads are currently set to read-only.',
        group: 'Medien',
    },

    upload: {
        // from the imageSizes below, the admin UI will show this size for previewing
        adminThumbnail: 'thumbnail',

        staticDir: path.resolve(__dirname, '../../media'),

        // limit the types of files allowed and request validation
        mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/avif'],

        imageSizes: [
            {
                name: 'event',
                width: 1080,
                height: 1080,
            },
            {
                name: 'thumbnail',
                width: 480,
                height: 320,
            },
            {
                name: 'wide',
                width: 1248,
                height: 288,
            },
        ],
    },

    // Base fields for file information and imageSizes are inherited from upload collection.
    fields: [
        {
            name: 'alt',
            label: 'Alternativtext',
            type: 'text',
            required: true,
            admin: {
                description: 'Gib "-" ein, falls es sich um ein rein dekoratives Element handelt',
            },
        },
    ],
};

export default Media;

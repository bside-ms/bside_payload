import path from 'path';
import type { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin';

const Media: CollectionConfig = {
    slug: 'media',

    access: {
        read: () => true,
        create: isAdmin,
        update: isAdmin,
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
        mimeTypes: [
            'image/png',
            'image/jpeg',
            'image/webp',
            'image/avif',
        ],

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
                name: 'portrait',
                width: 768,
                height: 1024,
            },
            {
                name: 'hero',
                width: 1920,
                height: 1080,
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
        },
    ],
};

export default Media;

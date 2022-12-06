import path from 'path';
import type { CollectionConfig } from 'payload/types';

const Media: CollectionConfig = {
    slug: 'media',

    // ToDo: Talk about this.
    access: {
        // Allow display and download.

        // Allow the rest for testing purposes.
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },

    admin: {
        useAsTitle: 'filename',
        description: 'Uploads are currently set to read-only.',
        group: 'Media',
    },

    upload: {
        adminThumbnail: 'thumbnail',
        staticDir: path.resolve(__dirname, '../../media'),
        mimeTypes: [
            'image/png',
            'image/jpeg',
        ],
        imageSizes: [
            {
                name: 'thumbnail',
                width: 480,
                height: 320,
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

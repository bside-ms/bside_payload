import path from 'path';
import type { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin';

const Media: CollectionConfig = {
    slug: 'media',

    // ToDo: Talk about this.
    access: {
        read: () => true,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
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
        {
            name: 'darkModeFallback',
            label: 'Fallback für Darkmode',
            type: 'upload',
            relationTo: 'media',
            admin: {
                description: 'Choose an upload to render if the visitor is using dark mode.',
            },
        },
    ],
};

export default Media;

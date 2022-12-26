import type { CollectionConfig } from 'payload/types';
import toBeImplemented from './accesses/toBeImplemented';

const News: CollectionConfig = {
    slug: 'news',
    access: toBeImplemented,
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            type: 'text',
            name: 'title',
        },
        {
            type: 'textarea',
            name: 'content',
        },
        {
            name: 'body',
            label: 'Zugehörige Körperschaft',
            type: 'relationship',
            relationTo: 'corporate-bodies',
            hasMany: false,
            required: false,
        },
    ],
};

export default News;

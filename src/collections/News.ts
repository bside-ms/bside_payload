import type { CollectionConfig } from 'payload/types';
import needsLoginToRead from './accesses/needsLoginToRead';

const News: CollectionConfig = {
    slug: 'news',
    access: needsLoginToRead,
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
    ],
};

export default News;

import type { Block } from 'payload/types';

export const HeadlineBlock: Block = {
    slug: 'headlineBlock',

    labels: {
        singular: 'Überschrift',
        plural: 'Überschriften',
    },

    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Titel',
        },
        {
            name: 'anchor',
            type: 'text',
            required: false,
            label: 'Slug',
        },
    ],
};

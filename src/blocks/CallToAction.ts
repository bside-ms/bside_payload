import type { Block } from 'payload/types';

export const CallToAction: Block = {
    slug: 'callToAction',

    labels: {
        singular: 'CTA Block',
        plural: 'CTA Block',
    },

    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Titel',
        },
        {
            name: 'text',
            type: 'text',
            required: true,
            label: 'Text des Links',
        },
        {
            name: 'href',
            type: 'text',
            required: true,
            label: 'Link',
        },
    ],
};

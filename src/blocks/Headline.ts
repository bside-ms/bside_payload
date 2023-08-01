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
            name: 'teaser',
            type: 'text',
            required: false,
            label: 'Teaser',
            admin: {
                description: 'Optional: Der Teaser wird als kleiner Text oberhalb der Überschrift angezeigt.',
            },
        },
        {
            name: 'anchor',
            type: 'text',
            required: false,
            label: 'Anker',
            admin: {
                description: 'Optional: Kann zur direkten Verlinkung verwendet werden.',
            },
        },
    ],
};

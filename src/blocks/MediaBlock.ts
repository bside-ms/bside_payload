import type { Block } from 'payload';

export const MediaBlock: Block = {
    slug: 'mediaBlock',
    labels: {
        singular: 'Bild',
        plural: 'Bilder',
    },

    fields: [
        {
            name: 'media',
            label: 'Bild',
            type: 'upload',
            relationTo: 'media',
            required: true,
            admin: {
                description: 'ToDo: Beschreibungstext einfügen.',
            },
        },
        {
            name: 'size',
            label: 'Größe',
            type: 'radio',
            required: true,
            defaultValue: 'normal',
            options: [
                {
                    label: 'Standard',
                    value: 'normal',
                },
                {
                    label: 'Breit',
                    value: 'wide',
                },
                {
                    label: 'Quadratisch',
                    value: 'event',
                },
            ],
            admin: {
                layout: 'horizontal',
            },
        },
        {
            name: 'effects',
            label: 'Effekte',
            type: 'select',
            hasMany: true,
            options: [
                {
                    label: 'Blur',
                    value: 'blur',
                },
                {
                    label: 'Grayscale',
                    value: 'grayscale',
                },
                {
                    label: 'Desaturated',
                    value: 'desaturated',
                },
                {
                    label: 'Darker',
                    value: 'darker',
                },
            ],
        },
        {
            name: 'caption',
            label: 'Anmerkung',
            type: 'text',
        },
    ],
};

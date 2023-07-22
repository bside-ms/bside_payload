import type { Block } from 'payload/types';

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
            ],
            admin: {
                layout: 'horizontal',
            },
        },
        {
            name: 'caption',
            label: 'Anmerkung',
            type: 'text',
        },
    ],
};

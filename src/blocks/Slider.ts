import type { Block } from 'payload';
import { isEditorFieldLevel } from '@/access/isEditor';

export const Slider: Block = {
    slug: 'slider',
    labels: {
        singular: 'Gallerie',
        plural: 'Gallerien',
    },

    fields: [
        {
            type: 'select',
            name: 'sliderType',
            required: true,
            options: [
                {
                    label: 'Image Slider',
                    value: 'imageSlider',
                },
            ],
            admin: {
                width: '50%',
            },
            access: {
                read: () => true,
                create: isEditorFieldLevel,
                update: isEditorFieldLevel,
            },
        },
        {
            type: 'array',
            name: 'imageSlides',
            required: true,
            minRows: 3,
            admin: {
                condition: (_, siblingData) => siblingData.sliderType === 'imageSlider',
            },
            fields: [
                {
                    type: 'upload',
                    name: 'image',
                    relationTo: 'media',
                    required: true,
                },
                {
                    type: 'text',
                    name: 'description',
                    label: 'Beschreibung',
                    required: false,
                },
            ],
        },
    ],
};

import type { Block } from 'payload/types';

export const MediaBlock: Block = {
    slug: 'mediaBlock',
    labels: {
        singular: 'Medien',
        plural: 'Medien',
    },

    fields: [
        {
            name: 'media',
            label: 'Medium',
            type: 'upload',
            relationTo: 'media',
            required: true,
            admin: {
                description: 'Maximum upload file size: 12MB. Recommended file size for images is <500KB.',
            },
        },
        {
            name: 'size',
            label: 'Size',
            type: 'radio',
            defaultValue: 'normal',
            options: [
                {
                    label: 'Normal',
                    value: 'normal',
                },
                {
                    label: 'Wide',
                    value: 'wide',
                },
                {
                    label: 'Fullscreen',
                    value: 'fullscreen',
                },
            ],
            admin: {
                layout: 'horizontal',
            },
        },
        {
            name: 'caption',
            label: 'Caption',
            type: 'richText',
            admin: {
                elements: [
                    'link',
                ],
            },
        },
    ],
};

export default MediaBlock;

import type { Block } from 'payload/types';
import richText from '../fields/richText';

export const MediaContent: Block = {
    slug: 'mediaContent',
    labels: {
        singular: 'Medien + Inhalt',
        plural: 'Medien + Inhalt',
    },

    fields: [
        {
            name: 'alignment',
            label: 'Ausrichtung',
            type: 'radio',
            defaultValue: 'contentOnLeft',
            required: true,
            options: [
                {
                    label: 'Inhalt auf der linken Seite',
                    value: 'contentOnLeft',
                },
                {
                    label: 'Inhalt auf der rechten Seite',
                    value: 'contentOnRight',
                },
            ],
            admin: {
                layout: 'horizontal',
            },
        },
        richText(
            {},
            {
                elements: [
                    'ol',
                    'ul',
                    'indent',
                ],
            },
        ),
        {
            name: 'media',
            type: 'upload',
            relationTo: 'media',
            required: true,
            admin: {
                description: 'Maximum upload file size: 2MB. Recommended file size for images is <500KB.',
            },
        },
    ],
};

export default MediaContent;

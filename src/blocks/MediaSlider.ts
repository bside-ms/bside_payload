import type { Block } from 'payload/types';
import richText from '../fields/richText';

export const MediaSlider: Block = {
    slug: 'mediaSlider',
    labels: {
        singular: 'Medien-Kachel',
        plural: 'Medien-Kacheln',
    },
    fields: [
        richText({
            name: 'introContent',
            label: 'Beschreibungstext',
        }),
        {
            name: 'slides',
            type: 'array',
            minRows: 3,
            labels: {
                singular: 'Kachel',
                plural: 'Kacheln',
            },
            fields: [
                {
                    name: 'media',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                    admin: {
                        description:
                            'Maximum upload file size: 12MB. Recommended file size for images is <500KB.',
                    },
                },
            ],
        },
    ],
};

export default MediaSlider;

import type { Block } from 'payload/types';
import richText from '../fields/richText';

export const MediaContent: Block = {
    slug: 'mediaContent',
    labels: {
        singular: 'Bild + Text',
        plural: 'Bild + Text',
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
            {
                label: 'Text',
            },
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
            label: 'Bild',
            relationTo: 'media',
            required: true,
            admin: {
                description: 'ToDo: Beschreibung einfügen.',
            },
        },
    ],
};

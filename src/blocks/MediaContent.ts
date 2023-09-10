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
            type: 'row',
            fields: [
                {
                    name: 'alignment',
                    label: 'Ausrichtung',
                    type: 'select',
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
                        {
                            label: 'Inhalt unterhalb des Bildes',
                            value: 'contentOnBottom',
                        },
                    ],
                    admin: {
                        width: '50%',
                    },
                },
                {
                    name: 'backgroundColor',
                    label: 'Hintergrundfarbe',
                    type: 'select',
                    defaultValue: 'white',
                    required: true,
                    options: [
                        {
                            label: 'Weiß',
                            value: 'white',
                        },
                        {
                            label: 'Schwarz',
                            value: 'black',
                        },
                    ],
                    admin: {
                        width: '50%',
                    },
                },
                {
                    name: 'headline',
                    label: 'Titel',
                    type: 'text',
                    required: false,
                    admin: {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        condition: (_: undefined, siblingData: { alignment: string }): boolean => {
                            return siblingData.alignment === 'contentOnBottom';
                        },
                    },
                },
            ],
        },

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
    ],
};

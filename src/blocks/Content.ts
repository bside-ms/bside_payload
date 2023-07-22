import type { Block } from 'payload/types';
import richText from '../fields/richText';

export const Content: Block = {
    slug: 'content',

    labels: {
        singular: 'Block',
        plural: 'Blöcke',
    },

    fields: [
        {
            type: 'row',
            fields: [
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
                    name: 'backgroundWidth',
                    label: 'Hintergrund-Design',
                    type: 'select',
                    defaultValue: 'full',
                    required: true,
                    options: [
                        {
                            label: 'Breit',
                            value: 'full',
                        },
                        {
                            label: 'Block',
                            value: 'block',
                        },
                    ],
                    admin: {
                        width: '50%',
                    },
                },
            ],
        },
        {
            name: 'columns',
            type: 'array',
            minRows: 1,
            label: 'Spalten',
            labels: {
                singular: 'Spalte',
                plural: 'Spalten',
            },
            fields: [
                {
                    name: 'width',
                    label: 'Breite der Spalte',
                    type: 'select',
                    defaultValue: 'full',
                    required: true,
                    options: [
                        {
                            label: 'Ganze Breite',
                            value: 'full',
                        },
                        {
                            label: '1/2 - Halbe Seite',
                            value: 'half',
                        },
                        {
                            label: '1/3 - Ein Drittel',
                            value: 'oneThird',
                        },
                        {
                            label: '2/3 - Zwei Drittel',
                            value: 'twoThirds',
                        },
                    ],
                },

                richText(
                    {
                        label: 'Text',
                    },
                    { elements: [
                        'ol',
                        'ul',
                        'indent',
                        'relationship',
                        'upload',
                    ] },
                ),
            ],
        },
    ],
};

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
            name: 'columns',
            type: 'array',
            minRows: 1,
            labels: {
                singular: 'Spalte',
                plural: 'Spalten',
            },
            fields: [

                {
                    type: 'row',
                    fields: [
                        {
                            name: 'width',
                            label: 'Breite der Spalte',
                            type: 'select',
                            defaultValue: 'full',
                            required: true,
                            options: [
                                {
                                    label: '1/3',
                                    value: 'oneThird',
                                },
                                {
                                    label: '1/2',
                                    value: 'half',
                                },
                                {
                                    label: '2/3',
                                    value: 'twoThirds',
                                },
                                {
                                    label: 'Ganze Breite',
                                    value: 'full',
                                },
                            ],
                            admin: {
                                width: '50%',
                            },
                        },
                        {
                            name: 'alignment',
                            label: 'Ausrichtung',
                            type: 'select',
                            defaultValue: 'left',
                            required: true,
                            options: [
                                {
                                    label: 'Links',
                                    value: 'left',
                                },
                                {
                                    label: 'Mitte',
                                    value: 'center',
                                },
                                {
                                    label: 'Rechts',
                                    value: 'right',
                                },
                            ],
                            admin: {
                                width: '50%',
                                disabled: true,
                            },
                        },
                    ],
                },

                richText(
                    {},
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

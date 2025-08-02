import type { Block } from 'payload';
import richText from '@/fields/richText';
import isArray from 'lodash-es/isArray';
import isObject from 'lodash-es/isObject';

export const Content: Block = {
    slug: 'content',

    labels: {
        singular: 'Textblock',
        plural: 'Textblöcke',
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
            required: true,
            label: 'Spalten',
            labels: {
                singular: 'Spalte',
                plural: 'Spalten',
            },
            validate: (value: unknown) => {
                if (!isArray(value) || value.every(isObject)) {
                    return `Es ist ein unerwarteter Fehler aufgetreten (${JSON.stringify(value)})`;
                }

                const columns = value as Array<{ id: string; width: 'full' | 'half' | 'oneThird' | 'twoThirds'; richText: Array<object> }>;

                const widthOfFirstColumn = columns[0].width;

                const amountOfColumns = columns.length;

                switch (widthOfFirstColumn) {
                    case 'full':
                        return amountOfColumns === 1 ? true : 'Bei "Ganze Breite" ist nur eine Spalte im Layout-Element zulässig.';
                    case 'half':
                        return amountOfColumns === 2 ? true : 'Bei "Halbe Seite" müssen exakt zwei Spalten im Layout-Element sein.';
                    case 'oneThird':
                        return amountOfColumns === 3 ? true : 'Bei "Ein Drittel" müssen exakt drei Spalten im Layout-Element sein.';
                    case 'twoThirds':
                        return amountOfColumns === 2 ? true : 'Bei "Zwei Drittel" müssen exakt zwei Spalten im Layout-Element sein.';
                }
            },
            fields: [
                {
                    name: 'width',
                    label: 'Breite der Spalte',
                    type: 'select',
                    defaultValue: 'full',
                    required: true,
                    admin: {
                        description: `
                            Nur bei erster Spalte in jeweiligem Layout-Element relevant. Bei "Ganze Breite" ist nur eine Spalte
                            im Element zulässig. Bei "Halbe Seite" und "Zwei Drittel" müssen es zwei, bei "Ein Drittel"
                            drei Spalten sein.
                        `,
                    },
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
                    { elements: ['ol', 'ul', 'indent', 'relationship', 'upload'] },
                ),
            ],
        },
    ],
};

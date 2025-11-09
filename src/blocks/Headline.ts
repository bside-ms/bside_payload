import type { Block } from 'payload';

export const HeadlineBlock: Block = {
    slug: 'headlineBlock',

    labels: {
        singular: 'Überschrift',
        plural: 'Überschriften',
    },

    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Titel',
        },
        {
            name: 'teaser',
            type: 'text',
            required: false,
            label: 'Teaser',
            admin: {
                description: 'Optional: Der Teaser wird als kleiner Text oberhalb der Überschrift angezeigt.',
            },
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'level',
                    type: 'select',
                    required: true,
                    defaultValue: 'h2',
                    options: [
                        {
                            label: 'h1',
                            value: 'h1',
                        },
                        {
                            label: 'h2',
                            value: 'h2',
                        },
                        {
                            label: 'h3',
                            value: 'h3',
                        },
                        {
                            label: 'h4',
                            value: 'h4',
                        },
                    ],
                    admin: {
                        width: '33%',
                        description: 'Achtung: Es darf maximal eine Überschrift der Größe H1 geben!',
                    },
                },
                {
                    name: 'as',
                    type: 'select',
                    required: true,
                    defaultValue: 'h2',
                    options: [
                        {
                            label: 'h1',
                            value: 'h1',
                        },
                        {
                            label: 'h2',
                            value: 'h2',
                        },
                        {
                            label: 'h3',
                            value: 'h3',
                        },
                        {
                            label: 'h4',
                            value: 'h4',
                        },
                    ],
                    admin: {
                        width: '33%',
                        description: 'Dies ist die Größe, die im Browser angezeigt wird.',
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
                        width: '33%',
                    },
                },
                {
                    name: 'anchor',
                    type: 'text',
                    required: false,
                    label: 'Anker',
                    admin: {
                        description: 'Optional: Kann zur direkten Verlinkung verwendet werden.',
                    },
                },
            ],
        },
    ],
};

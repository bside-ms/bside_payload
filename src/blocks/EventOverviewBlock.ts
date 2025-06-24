import type { Block } from 'payload/types';
import richText from '../fields/richText';

export const EventOverviewBlock: Block = {
    slug: 'eventOverview',

    labels: {
        singular: 'Veranstaltungsübersicht',
        plural: 'Veranstaltungsübersicht',
    },

    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Titel',
        },

        {
            name: 'eventSide',
            label: 'Ausrichtung',
            type: 'select',
            required: true,
            defaultValue: 'textRight',
            options: [
                {
                    label: 'Text auf der linken Seite',
                    value: 'textLeft',
                },
                {
                    label: 'Text auf der rechten Seite',
                    value: 'textRight',
                },
            ],
            admin: {
                width: '50%',
            },
        },

        richText(
            {
                label: 'Begleittext',
            },
            {
                elements: ['ol', 'ul', 'indent'],
            },
        ),
    ],
};

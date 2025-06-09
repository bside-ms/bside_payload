import type { Block } from 'payload/types';
import richText from '../fields/richText';

export const TeaserBlock: Block = {
    slug: 'teaser',

    labels: {
        singular: 'Teaser',
        plural: 'Teaser',
    },

    fields: [
        {
            name: 'headlineTitle',
            type: 'text',
            required: true,
            label: 'Titel',
        },
        {
            name: 'headlineTeaser',
            type: 'text',
            required: false,
            label: 'Teaser',
            admin: {
                description: 'Optional: Der Teaser wird als kleiner Text oberhalb der Überschrift angezeigt.',
            },
        },
        {
            name: 'reversed',
            type: 'checkbox',
            label: 'Gedreht?',
            required: false,
            admin: {
                description: 'Wird dieser Haken gesetzt, wird das Bild auf der linken Seite angezeigt',
            },
        },
        {
            name: 'linkText',
            type: 'text',
            required: true,
            label: 'Text des Buttons',
        },
        {
            name: 'linkHref',
            type: 'text',
            required: true,
            label: 'Link',
        },

        {
            name: 'image',
            type: 'upload',
            label: 'Bild',
            relationTo: 'media',
            required: true,
            admin: {
                description: 'ToDo: Beschreibung einfügen.',
            },
        },

        richText(
            {
                label: 'Text',
            },
            {
                elements: ['ol', 'ul', 'indent'],
            },
        ),
    ],
};

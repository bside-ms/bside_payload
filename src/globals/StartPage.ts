import type { GlobalConfig } from 'payload';
import { isOrganisator } from '../access/isOrganisator';

export const StartPage: GlobalConfig = {
    slug: 'start-page',
    label: 'Startseite',

    admin: {
        group: 'Statisches',
        livePreview: {
            url: ({ locale }) => {
                return `${process.env.NEXT_PUBLIC_SITE_URL}${locale.code === 'de' ? '' : '/en'}`;
            },
        },
    },

    access: {
        read: () => true,
        update: isOrganisator,
    },

    fields: [
        {
            type: 'text',
            name: 'title',
            label: 'Titel',
            localized: true,
            required: true,
        },
        {
            type: 'textarea',
            name: 'textBody',
            label: 'Text',
            localized: true,
            required: true,
        },
        {
            type: 'text',
            name: 'buttonText',
            label: 'Text des Buttons',
            localized: true,
            required: true,
        },
    ],
};

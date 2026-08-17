import type { GlobalConfig } from 'payload';
import { isOrganisator } from '@/access/isOrganisator';
import { revalidateGlobal } from '@/utilities/revalidateWebsite';

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

    hooks: {
        afterChange: [revalidateGlobal],
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

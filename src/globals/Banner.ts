import type { GlobalConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin';

export const Banner: GlobalConfig = {
    slug: 'banner',
    label: 'Banner',

    admin: {
        group: 'Statisches',
        livePreview: {
            url: ({ locale }) => {
                return `${process.env.PAYLOAD_PUBLIC_SITE_URL}${locale.code === 'de' ? 'bside' : '/en/bside'}`;
            },
        },
    },

    access: {
        read: () => true,
        update: isAdmin,
    },

    fields: [
        {
            type: 'checkbox',
            name: 'isActive',
            label: 'Banner anzeigen',
            localized: false,
            required: true,
            admin: {
                description: 'Das Banner wird überall angezeigt, wenn diese Checkbox aktiviert ist.',
                width: '50%',
            },
        },

        {
            type: 'number',
            name: 'bannerId',
            label: 'Banner-ID',
            localized: false,
            required: true,
            admin: {
                description: 'Für jedes Banner muss diese Nummer um +1 erhöht werden.',
                width: '50%',
            },
        },

        {
            type: 'text',
            name: 'bannerText',
            label: 'Anzeigetext',
            localized: true,
            required: true,
            admin: {
                description: 'Der Text, der innerhab des Banners sichtbar ist.',
            },
        },

        {
            type: 'text',
            name: 'bannerLink',
            label: 'Link',
            localized: false,
            required: false,
            admin: {
                description: 'Der Link, der aufgerufen wird, wenn auf das Banner geklickt wird. Falls leer, ist das Banner nicht klickbar.',
            },
        },

        {
            type: 'text',
            name: 'backgroundColor',
            label: 'Hintergrundfarbe',
            localized: false,
            required: true,
            admin: {
                description: 'Die Hintergrundfarbe des Banner.',
                width: '50%',
            },
        },

        {
            type: 'text',
            name: 'textColor',
            label: 'Textfarbe',
            localized: false,
            required: true,
            admin: {
                description: 'Die Textfarbe des Banner.',
                width: '50%',
            },
        },
    ],
};

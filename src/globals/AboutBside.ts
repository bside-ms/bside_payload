import type { GlobalConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin';

export const AboutBside: GlobalConfig = {
    slug: 'about-bside',
    label: 'Über die B-Side',

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
            type: 'text',
            name: 'title',
            label: 'Überschrift',
            localized: true,
            required: true,
        },
        {
            type: 'textarea',
            name: 'textBody',
            label: 'Untertitel',
            localized: true,
            required: true,
        },

        {
            type: 'tabs',
            label: 'Abschnitte',

            tabs: [
                {
                    name: 'firstSection',
                    label: 'Haus',
                    fields: [
                        {
                            type: 'text',
                            name: 'title',
                            required: true,
                            localized: true,
                        },
                        {
                            type: 'textarea',
                            name: 'description',
                            required: true,
                            localized: true,
                        },
                    ],
                },
                {
                    name: 'secondSection',
                    label: 'Kollektiv',
                    fields: [
                        {
                            type: 'text',
                            name: 'title',
                            required: true,
                            localized: true,
                        },
                        {
                            type: 'textarea',
                            name: 'description',
                            required: true,
                            localized: true,
                        },
                    ],
                },
                {
                    name: 'thirdSection',
                    label: 'History',
                    fields: [
                        {
                            type: 'text',
                            name: 'title',
                            required: true,
                            localized: true,
                        },
                        {
                            type: 'textarea',
                            name: 'description',
                            required: true,
                            localized: true,
                        },
                    ],
                },
                {
                    name: 'fourthSection',
                    label: 'Trägerschaft',
                    fields: [
                        {
                            type: 'text',
                            name: 'title',
                            required: true,
                            localized: true,
                        },
                        {
                            type: 'textarea',
                            name: 'description',
                            required: true,
                            localized: true,
                        },
                    ],
                },
            ],
        },
    ],
};

import type { CollectionConfig } from 'payload/types';
import { checkRole } from '../access/checkRole';
import { isAdmin } from '../access/isAdmin';
import { publishedOnly } from '../access/publishedOnly';
import richText from '../fields/richText';
import { slugField } from '../fields/slug';

const Events: CollectionConfig = {
    slug: 'events',

    labels: {
        singular: 'Veranstaltung',
        plural: 'Veranstaltungen',
    },

    admin: {
        useAsTitle: 'title',
    },

    versions: {
        drafts: true,
    },

    access: {
        create: isAdmin,
        read: publishedOnly,
        update: isAdmin,
        delete: isAdmin,
        admin: ({ req: { user } }) => checkRole(user, ['admin']), // eslint-disable-line @typescript-eslint/no-unsafe-argument
    },

    fields: [
        {
            type: 'tabs',
            tabs: [

                //
                // Allgemeines
                //
                {
                    name: 'general',
                    label: 'Allgemeines',
                    fields: [
                        {
                            name: 'title',
                            type: 'text',
                            label: 'Name',
                            required: true,
                        },

                        richText(),

                        {
                            name: 'eventImage',
                            label: 'Bild',
                            type: 'upload',
                            relationTo: 'media',
                            filterOptions: {
                                mimeType: { contains: 'image' },
                            },
                            admin: {
                                description: 'Empfohlen: webp mit 1080x1080px',
                            },
                        },
                    ],
                },

                //
                // Ort und Zeit
                //
                {
                    name: 'event',
                    label: 'Ort und Zeit',
                    fields: [
                        {
                            name: 'eventLocation',
                            type: 'text',
                            label: 'Veranstaltungsort',
                            required: true,
                        },
                        {
                            name: 'eventDate',
                            type: 'date',
                            label: 'Datum',
                            required: true,
                            admin: {
                                date: {
                                    displayFormat: 'dd MMM yyy',
                                },
                            },
                        },
                        {
                            name: 'eventStart',
                            type: 'date',
                            label: 'Startzeit',
                            required: true,
                            admin: {
                                date: {
                                    pickerAppearance: 'timeOnly',
                                    displayFormat: 'HH:mm',
                                    timeFormat: 'HH:mm',
                                    timeIntervals: 15,
                                },
                            },
                        },
                        {
                            name: 'eventEnd',
                            type: 'date',
                            label: 'Endzeit',
                            required: false,
                            admin: {
                                date: {
                                    pickerAppearance: 'timeOnly',
                                    displayFormat: 'HH:mm',
                                    timeFormat: 'HH:mm',
                                    timeIntervals: 15,
                                },
                            },
                        },
                    ],
                },

                //
                // Details
                //
                {
                    name: 'details',
                    label: 'Details',
                    fields: [
                        {
                            name: 'eventOrganizer',
                            type: 'text',
                            label: 'Veranstaltet von',
                            required: false,
                        },

                        {
                            name: 'eventExtra',
                            type: 'text',
                            label: 'Zusätzliche Informationen',
                            required: false,
                            admin: {
                                description: 'Dieser Text wird auf der Detail-Seite über dem Ort angezeigt. Beispiel: VVK 5€ // AK 10€.',
                            },
                        },

                        {
                            name: 'category',
                            type: 'select',
                            label: 'Typ',
                            required: false,
                            hasMany: true,
                            admin: {
                                description: 'Dieses Feld wird zum Filtern der Veranstaltungen verwendet.',
                                isClearable: true,
                                isSortable: true,
                            },
                            options: [
                                {
                                    label: 'Konzert',
                                    value: 'concert',
                                },
                                {
                                    label: 'Film',
                                    value: 'movie',
                                },
                                {
                                    label: 'Theater',
                                    value: 'theater',
                                },
                                {
                                    label: 'Plenum',
                                    value: 'plenum',
                                },
                                {
                                    label: 'Workshop',
                                    value: 'workshop',
                                },
                                {
                                    label: 'Workshop',
                                    value: 'workshop',
                                },
                            ],
                        },
                    ],
                },

                //
                // Anzeige
                //
                {
                    label: 'Anzeige',
                    name: 'display',
                    fields: [
                        {
                            name: 'displayOnHome',
                            type: 'checkbox',
                            label: 'Startseite',
                            defaultValue: false,
                        },
                        {
                            name: 'displayOnOverview',
                            type: 'checkbox',
                            label: 'Veranststaltungsübersicht',
                            defaultValue: true,
                        },
                        {
                            name: 'displayOnOrgansation',
                            type: 'checkbox',
                            label: 'Körperschaft',
                            defaultValue: true,
                        },
                        {
                            name: 'displayOnCircle',
                            type: 'checkbox',
                            label: 'Kreis',
                            defaultValue: true,
                        },

                    ],
                },
            ],
        },

        slugField(),
    ],
};

export default Events;

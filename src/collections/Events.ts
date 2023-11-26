import type { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin';
import { isEditor, isEditorFieldLevel } from '../access/isEditor';
import { isUser, isUserOrPublished } from '../access/isUser';
import richText from '../fields/richText';
import { slugField } from '../fields/slug';
import createEventSlug from '../utilities/createEventSlug';

const Events: CollectionConfig = {
    slug: 'events',

    labels: {
        singular: 'Veranstaltung',
        plural: 'Veranstaltungen',
    },

    admin: {
        useAsTitle: 'title',
        group: 'B-Side',
        defaultColumns: ['title', 'eventDate', 'eventStart', 'updatedAt', '_status'],

        livePreview: {
            url: ({ data, locale }) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                return `${process.env.PAYLOAD_PUBLIC_SITE_URL}/${locale.code === 'de' ? '' : 'en/'}events/${createEventSlug(data.slug, data.title, data.id)}`;
            },
        },
    },

    versions: {
        drafts: true,
    },

    access: {
        create: isUser,
        read: isUserOrPublished,
        update: isEditor,
        delete: isAdmin,
    },

    fields: [
        {
            type: 'tabs',
            tabs: [

                //
                // Allgemeines
                //
                {
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
                    label: 'Details',
                    fields: [
                        {
                            name: 'eventOwner',
                            label: 'Verantwortlicher Kreis',
                            type: 'relationship',
                            relationTo: ['organisations', 'circles'],
                            hasMany: true,
                            admin: {
                                description:
                                    'Der angegebene Kreis wird auf der Veranstaltungsseite angezeigt. ' +
                                    'Außerdem erscheint die Veranstaltung in der Veranstaltungübersicht des Kreises und der dazugehörigen Körperschaft.',
                            },
                        },
                        {
                            name: 'eventOrganizer',
                            type: 'text',
                            label: 'Veranstaltet von',
                            required: false,
                            admin: {
                                description:
                                    'Dieses Feld wird nur benötigt, falls kein eindeutiger Kreis/Körperschaft für die Veranstaltung verantwortlich ist.',
                            },
                        },

                        {
                            name: 'eventExtra',
                            type: 'text',
                            label: 'Zusätzliche Informationen',
                            required: false,
                            admin: {
                                description:
                                    'Dieser Text wird auf der Detail-Seite über dem Ort angezeigt. ' +
                                    'Beispiel: VVK 5€ // AK 10€.',
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
                            ],
                        },
                    ],
                },

                //
                // Anzeige
                //
                {
                    label: 'Anzeige',
                    description: 'Hier kann eingestellt werden, auf welchen Veranstaltungsübersichten die Veranstaltung angezeigt werden soll.',
                    fields: [
                        {
                            name: 'displayOnHome',
                            type: 'checkbox',
                            label: 'Startseite',
                            defaultValue: true,
                            access: {
                                update: isEditorFieldLevel,
                            },
                        },
                        {
                            name: 'displayOnOverview',
                            type: 'checkbox',
                            label: 'Veranststaltungsübersicht',
                            defaultValue: true,
                        },
                        {
                            name: 'displayOnOrganisation',
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

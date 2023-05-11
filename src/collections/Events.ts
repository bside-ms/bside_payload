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
            name: 'title',
            type: 'text',
            label: 'Name',
            required: true,
        },

        //
        // Details
        {
            name: 'eventLocation',
            type: 'text',
            label: 'Veranstaltungsort',
            required: true,
        },
        {
            name: 'eventExtra',
            type: 'text',
            label: 'Extra',
            required: false,
        },
        {
            name: 'eventImage',
            type: 'upload',
            relationTo: 'media',
            filterOptions: {
                mimeType: { contains: 'image' },
                imageSize: { contains: 'event' },
            },
        },

        //
        // Dates

        {
            name: 'eventDate',
            type: 'date',
            label: 'Datum',
            required: true,
            admin: {
                date: {
                    displayFormat: 'dd MMM yyy',
                },
                position: 'sidebar',
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
                position: 'sidebar',
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
                position: 'sidebar',
            },
        },

        richText(),
        slugField(),
    ],
};

export default Events;

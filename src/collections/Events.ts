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

        {
            name: 'dateStart',
            type: 'date',
            label: 'Startzeit',
            required: true,
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                },
                position: 'sidebar',
            },
        },

        {
            name: 'dateEnd',
            type: 'date',
            label: 'Endzeit',
            required: false,
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                },
                position: 'sidebar',
            },
        },

        {
            name: 'place',
            type: 'text',
            label: 'Ort',
            required: true,
        },

        richText(),
        slugField(),
        
        // ToDo: Autogenerate Slug.
        // ToDo: Link Arbeitskreis
    ],
};

export default Events;

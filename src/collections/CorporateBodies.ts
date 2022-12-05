import type { CollectionConfig } from 'payload/types';
import toBeImplemented from './accesses/toBeImplemented';

const CorporateBody: CollectionConfig = {
    slug: 'corporateBodies',

    labels: {
        singular: 'Körperschaft',
        plural: 'Körperschaften',
    },

    access: toBeImplemented,

    admin: {
        useAsTitle: 'name',
        group: 'Administration',
        defaultColumns: ['phone'],
    },

    fields: [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            unique: true,
            required: true,
        },
        {
            name: 'mail',
            label: 'E-Mail',
            type: 'email',
            unique: true,
            required: true,
        },
        {
            name: 'phone',
            label: 'Telefon',
            type: 'text',
            required: false,
        },
        {
            name: 'address',
            label: 'Adresse',
            type: 'richText',
            required: true,
        },
        {
            name: 'legal',
            label: 'Rechtliche Informationen',
            type: 'richText',
            required: false,
        },
    ],
};

export default CorporateBody;

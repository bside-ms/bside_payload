import type { CollectionConfig } from 'payload/types';
import { isApiUser } from '../../access/isApiUser';

const ContactForms: CollectionConfig = {
    slug: 'contact-forms',

    labels: {
        singular: 'Kontaktformular',
        plural: 'Kontaktformulare',
    },

    admin: {
        group: 'Automated Collections',
    },

    versions: {
        drafts: true,
    },

    access: {
        create: isApiUser,
        read: isApiUser,
        update: isApiUser,
        delete: isApiUser,
    },

    fields: [
        {
            name: 'fullName',
            type: 'text',
            required: true,
        },
        {
            name: 'mailAddress',
            type: 'text',
            required: true,
        },
        {
            name: 'message',
            type: 'textarea',
            required: true,
        },
        {
            name: 'sendCopyToSender',
            type: 'text',
            required: false,
        },
        {
            name: 'recipient',
            type: 'text',
            required: true,
        },
    ],
};

export default ContactForms;

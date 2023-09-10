import type { CollectionConfig } from 'payload/types';
import { isAdmin } from '../../access/isAdmin';

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
        create: () => true,
        read: isAdmin,
        update: isAdmin,
        delete: isAdmin,
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

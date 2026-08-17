import type { CollectionConfig } from 'payload';
import { isAdmin } from '@/access/isAdmin';
import { authorFields, authorFieldsBeforeChangeHook } from '@/fields/authorFields';

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

    hooks: {
        beforeChange: [authorFieldsBeforeChangeHook],
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

        ...authorFields,
    ],
};

export default ContactForms;

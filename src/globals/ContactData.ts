import type { GlobalConfig } from 'payload/types';

const ContactData: GlobalConfig = {
    slug: 'contactData',
    fields: [
        {
            name: 'Adresse',
            type: 'textarea',
        },
        {
            name: 'Telefonnummer',
            type: 'text',
        },
        {
            name: 'E-Mail',
            type: 'email',
        },
    ],
};

export default ContactData;

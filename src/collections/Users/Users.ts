import type { CollectionConfig } from 'payload/types';
import { isAdmin } from '../../access/isAdmin';

const Users: CollectionConfig = {
    slug: 'users',
    auth: true,

    labels: {
        singular: 'User',
        plural: 'User',
    },

    admin: {
        useAsTitle: 'email',
        group: 'Benutzer:innen-Verwaltung',
    },

    access: {
        create: isAdmin,
        read: () => true,
        update: isAdmin,
        delete: isAdmin,
    },

    fields: [
        {
            name: 'isAdmin',
            required: false,
            type: 'checkbox',
        },
    ],
};

export default Users;

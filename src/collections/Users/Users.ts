import type { CollectionConfig } from 'payload/types';
import needsLoginToRead from '../accesses/needsLoginToRead';

const Users: CollectionConfig = {
    slug: 'users',
    auth: true,

    admin: {
        useAsTitle: 'email',
        group: 'Benutzer:innen-Verwaltung',
    },

    access: needsLoginToRead,

    fields: [
        {
            name: 'isAdmin',
            required: false,
            type: 'checkbox',
        },
    ],
};

export default Users;

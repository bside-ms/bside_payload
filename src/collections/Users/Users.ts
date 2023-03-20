import type { CollectionConfig } from 'payload/types';
import { isAdminFieldLevel } from '../../access/isAdmin';
import { isAdminOrSelfFieldLevel } from '../../access/isAdminOrSelf';
import { isTrue } from '../../access/isTrue';

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
        create: isTrue,
        read: () => true,
        update: isTrue,
        delete: isTrue,
    },

    fields: [
        {
            type: 'row',
            fields: [
                {
                    name: 'firstName',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'lastName',
                    type: 'text',
                    required: true,
                },
            ],
        },

        {
            name: 'roles',
            type: 'select',
            hasMany: true,
            defaultValue: ['public'],
            required: true,
            access: {
                read: isAdminOrSelfFieldLevel,
                create: isAdminFieldLevel,
                update: isAdminFieldLevel,
            },
            options: ['public', 'editor', 'admin'],
        },
    ],
};

export default Users;

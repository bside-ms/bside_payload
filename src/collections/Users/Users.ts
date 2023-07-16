import type { CollectionConfig } from 'payload/types';
import { isAdmin, isAdminFieldLevel } from '../../access/isAdmin';
import { isAdminOrSelf, isAdminOrSelfFieldLevel } from '../../access/isAdminOrSelf';

const Users: CollectionConfig = {
    slug: 'users',
    auth: {
        tokenExpiration: 28800, // 8 hours
        cookies: {
            sameSite: 'none',
            secure: true,
            domain: process.env.COOKIE_DOMAIN,
        },
    },

    labels: {
        singular: 'User',
        plural: 'User',
    },

    admin: {
        useAsTitle: 'firstName',
        group: 'Benutzer:innen-Verwaltung',
        defaultColumns: ['email', 'firstName', 'lastName', 'roles', 'createdAt', 'updatedAt'],
    },

    access: {
        create: () => true,
        read: isAdminOrSelf,
        update: isAdmin,
        delete: isAdmin,
        admin: () => true,  
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

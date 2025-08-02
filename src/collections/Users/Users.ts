import type { CollectionConfig } from 'payload';
import { isAdmin, isAdminFieldLevel } from '@/access/isAdmin';
import { isAdminOrSelf, isAdminOrSelfFieldLevel } from '@/access/isAdminOrSelf';

const Users: CollectionConfig = {
    slug: 'users',
    auth: {
        tokenExpiration: 28800, // 8 hours
        disableLocalStrategy: true,
        cookies: {
            sameSite: 'None',
            secure: true,
            domain: process.env.COOKIE_DOMAIN,
        },
    },

    labels: {
        singular: 'Benutzer*in',
        plural: 'Benutzer*innen',
    },

    admin: {
        useAsTitle: 'firstName',
        group: 'Benutzer:innen-Verwaltung',
        defaultColumns: ['email', 'firstName', 'lastName', 'roles'],
    },

    access: {
        create: isAdmin,
        read: isAdminOrSelf,
        update: isAdmin,
        delete: isAdmin,
        admin: () => true,
    },

    fields: [
        {
            name: 'email',
            type: 'email',
            required: true,
            access: {
                read: isAdminOrSelfFieldLevel,
                create: isAdminFieldLevel,
                update: isAdminFieldLevel,
            },
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'firstName',
                    label: 'Vorname',
                    type: 'text',
                    required: true,
                    access: {
                        read: isAdminOrSelfFieldLevel,
                        create: isAdminFieldLevel,
                        update: isAdminFieldLevel,
                    },
                },
                {
                    name: 'lastName',
                    label: 'Nachname',
                    type: 'text',
                    required: false,
                    access: {
                        read: isAdminOrSelfFieldLevel,
                        create: isAdminFieldLevel,
                        update: isAdminFieldLevel,
                    },
                },
            ],
        },

        {
            name: 'roles',
            type: 'select',
            label: 'Rollen',
            hasMany: true,
            defaultValue: ['public'],
            required: true,
            access: {
                read: isAdminOrSelfFieldLevel,
                create: isAdminFieldLevel,
                update: isAdminFieldLevel,
            },
            options: [
                {
                    value: 'public',
                    label: 'Benutzer*in',
                },
                {
                    value: 'editor',
                    label: 'Editor*in',
                },
                {
                    value: 'organisator',
                    label: 'Organisator*in',
                },
                {
                    value: 'admin',
                    label: 'Administrator*in',
                },
            ],
        },

        {
            name: 'circles',
            type: 'relationship',
            label: 'Kreismitgliedschaften',
            hasMany: true,
            required: false,
            access: {
                read: isAdminOrSelfFieldLevel,
                create: isAdminFieldLevel,
                update: isAdminFieldLevel,
            },
            relationTo: 'circles',
        },

        {
            name: 'sub',
            label: 'Keycloak-ID',
            type: 'text',
            access: {
                read: isAdminOrSelfFieldLevel,
                create: isAdminFieldLevel,
                update: isAdminFieldLevel,
            },
        },
    ],
};

export default Users;

import type { CollectionConfig } from 'payload';
import { isAdmin } from '@/access/isAdmin';

const ApiUsers: CollectionConfig = {
    slug: 'api-users',

    labels: {
        singular: 'API-User',
        plural: 'API-User',
    },

    admin: {
        group: 'Benutzer:innen-Verwaltung',
    },

    auth: {
        useAPIKey: true,
        disableLocalStrategy: true,
    },

    access: {
        create: isAdmin,
        read: isAdmin,
        update: isAdmin,
        delete: isAdmin,
    },

    fields: [],
};

export default ApiUsers;

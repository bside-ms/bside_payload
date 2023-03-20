import type { CollectionConfig } from 'payload/types';
import { isAdmin } from '../../access/isAdmin';

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
    },

    access: {
        create: isAdmin,
        read: () => true,
        update: isAdmin,
        delete: isAdmin,
    },

    fields: [],
};

export default ApiUsers;

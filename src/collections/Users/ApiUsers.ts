import type { CollectionConfig } from 'payload/types';
import needsLoginToRead from '../accesses/needsLoginToRead';

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

    access: needsLoginToRead,

    fields: [],
};

export default ApiUsers;

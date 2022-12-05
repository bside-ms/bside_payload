import type { CollectionConfig } from 'payload/types';
import needsLoginToRead from '../accesses/needsLoginToRead';

const ApiUsers: CollectionConfig = {
    slug: 'api-users',
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

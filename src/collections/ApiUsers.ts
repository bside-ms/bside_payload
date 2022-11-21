import type { CollectionConfig } from 'payload/types';
import needsLoginToRead from './accesses/needsLoginToRead';

const ApiUsers: CollectionConfig = {
    slug: 'api-users',
    auth: {
        useAPIKey: true,
    },
    access: needsLoginToRead,
    fields: [],
};

export default ApiUsers;

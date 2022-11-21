import type { CollectionConfig } from 'payload/types';
import needsLoginToRead from './accesses/needsLoginToRead';

const Users: CollectionConfig = {
    slug: 'users',
    auth: true,
    admin: {
        useAsTitle: 'email',
    },
    access: needsLoginToRead,
    fields: [],
};

export default Users;

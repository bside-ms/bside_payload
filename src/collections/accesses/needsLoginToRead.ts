import type { CollectionConfig } from 'payload/types';

const needsLoginToRead: CollectionConfig['access'] = {
    read: ({ req }) => req.user !== undefined && req.user !== null,
};

export default needsLoginToRead;

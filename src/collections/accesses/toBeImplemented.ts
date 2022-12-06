import type { CollectionConfig } from 'payload/types';

const toBeImplemented: CollectionConfig['access'] = {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
    readVersions: () => true,
};

export default toBeImplemented;

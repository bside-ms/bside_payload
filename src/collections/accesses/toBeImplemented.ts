import type { CollectionConfig } from 'payload/types';

const toBeImplemented: CollectionConfig['access'] = {
    read: () => true,
    update: () => true,
    delete: () => true,
};

export default toBeImplemented;

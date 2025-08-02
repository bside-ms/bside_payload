import type { CollectionConfig } from 'payload';
import { withAccountCollection } from 'payload-auth-plugin/collection';
import Users from '@/collections/Users/Users';

const Accounts: CollectionConfig = withAccountCollection(
    {
        slug: 'accounts',
    },
    Users.slug,
);

export default Accounts;

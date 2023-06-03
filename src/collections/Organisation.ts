import type { CollectionConfig } from 'payload/types';
import { checkRole } from '../access/checkRole';
import { isAdmin } from '../access/isAdmin';
import { publishedOnly } from '../access/publishedOnly';

const Organisation: CollectionConfig = {
    slug: 'organisations',

    labels: {
        singular: 'Körperschaft',
        plural: 'Körperschaften',
    },

    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'shortName'],
        group: 'B-Side',
    },

    versions: {
        drafts: true,
    },

    access: {
        create: isAdmin,
        read: publishedOnly,
        update: isAdmin,
        delete: isAdmin,
        admin: ({ req: { user } }) => checkRole(user, ['admin']), // eslint-disable-line @typescript-eslint/no-unsafe-argument
    },

    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'shortName',
            type: 'text',
            required: true,
        },
    ],
};

export default Organisation;

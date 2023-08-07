import type { CollectionConfig } from 'payload/types';
import { checkRole } from '../access/checkRole';
import { isAdmin } from '../access/isAdmin';
import { publishedOnly } from '../access/publishedOnly';
import { CallToAction } from '../blocks/CallToAction';
import { Content } from '../blocks/Content';
import { HeadlineBlock } from '../blocks/Headline';
import { MediaBlock } from '../blocks/MediaBlock';
import { MediaContent } from '../blocks/MediaContent';
import { slugField } from '../fields/slug';

const Pages: CollectionConfig = {
    slug: 'pages',

    labels: {
        singular: 'Seite',
        plural: 'Seiten',
    },

    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', 'updatedAt'],
        group: 'Administration',
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
            name: 'title',
            type: 'text',
            required: true,
        },

        // richText(),
        slugField(),

        {
            name: 'layout',
            label: 'Inhalt',
            type: 'blocks',
            minRows: 1,
            blocks: [
                CallToAction,
                Content,
                MediaBlock,
                MediaContent,
                HeadlineBlock,
            ],
            admin: {
                initCollapsed: true,
            },
        },
    ],
};

export default Pages;

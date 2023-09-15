import type { CollectionConfig } from 'payload/types';
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin';
import { isEditor } from '../access/isEditor';
import { publishedOnly } from '../access/publishedOnly';
import { CallToAction } from '../blocks/CallToAction';
import { Content } from '../blocks/Content';
import { EventOverviewBlock } from '../blocks/EventOverviewBlock';
import { HeadlineBlock } from '../blocks/Headline';
import { MediaBlock } from '../blocks/MediaBlock';
import { MediaContent } from '../blocks/MediaContent';
import { TeaserBlock } from '../blocks/Teaser';
import { slugField } from '../fields/slug';

const Pages: CollectionConfig = {
    slug: 'pages',

    labels: {
        singular: 'Seite',
        plural: 'Seiten',
    },

    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', 'parent', 'updatedAt', '_status'],
        group: 'Seiten',
    },

    versions: {
        drafts: true,
    },

    access: {
        create: isAdmin,
        read: publishedOnly,
        update: isEditor,
        delete: isAdmin,
    },

    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            access: {
                update: isAdminFieldLevel,
            },
        },

        // richText(),
        slugField(),

        {
            name: 'layout',
            label: 'Inhalt',
            type: 'blocks',
            minRows: 1,
            blocks: [
                HeadlineBlock,
                Content,
                MediaBlock,
                MediaContent,
                CallToAction,
                TeaserBlock,
                EventOverviewBlock,
            ],
            admin: {
                initCollapsed: true,
            },
        },
    ],
};

export default Pages;

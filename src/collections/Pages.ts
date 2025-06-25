import type { CollectionConfig } from 'payload';
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin';
import { isEditor } from '../access/isEditor';
import { isUserOrPublished } from '../access/isUser';
import { CallToAction } from '../blocks/CallToAction';
import { Content } from '../blocks/Content';
import { EventOverviewBlock } from '../blocks/EventOverviewBlock';
import { HeadlineBlock } from '../blocks/Headline';
import { MediaBlock } from '../blocks/MediaBlock';
import { MediaContent } from '../blocks/MediaContent';
import { Slider } from '../blocks/Slider';
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

        livePreview: {
            url: ({ data, locale }) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                return `${process.env.NEXT_PUBLIC_SITE_URL}${locale.code === 'de' ? '' : '/en'}${data.breadcrumbs[data.breadcrumbs.length - 1].url}`;
            },
        },
    },

    versions: {
        drafts: true,
    },

    access: {
        create: isAdmin,
        read: isUserOrPublished,
        update: isEditor,
        delete: isAdmin,
    },

    fields: [
        {
            name: 'title',
            type: 'text',
            localized: true,
            required: true,
            access: {
                update: isAdminFieldLevel,
            },
        },

        slugField(),

        {
            name: 'layout',
            label: 'Inhalt',
            type: 'blocks',
            localized: true,
            blocks: [HeadlineBlock, Content, MediaBlock, MediaContent, CallToAction, TeaserBlock, EventOverviewBlock, Slider],
            admin: {
                initCollapsed: true,
            },
        },
    ],
};

export default Pages;

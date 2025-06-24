import type { CollectionConfig } from 'payload/types';
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin';
import { isEditor } from '../access/isEditor';
import { isUserOrPublished } from '../access/isUser';
import { CallToAction } from '../blocks/CallToAction';
import { CircleOverviewBlock } from '../blocks/CircleOverviewBlock';
import { Content } from '../blocks/Content';
import { EventOverviewBlock } from '../blocks/EventOverviewBlock';
import { HeadlineBlock } from '../blocks/Headline';
import { MediaBlock } from '../blocks/MediaBlock';
import { MediaContent } from '../blocks/MediaContent';
import { TeaserBlock } from '../blocks/Teaser';

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
        read: isUserOrPublished,
        update: isEditor,
        delete: isAdmin,
    },

    fields: [
        {
            type: 'tabs',
            tabs: [
                // Allgemeines
                {
                    label: 'Allgemeines',
                    fields: [
                        {
                            name: 'name',
                            type: 'text',
                            required: true,
                            access: {
                                update: isAdminFieldLevel,
                            },
                        },
                        {
                            name: 'shortName',
                            type: 'text',
                            required: true,
                            access: {
                                update: isAdminFieldLevel,
                            },
                        },
                    ],
                },

                // Layout
                {
                    label: 'Seiten-Layout',
                    fields: [
                        {
                            name: 'layout',
                            label: 'Inhalt',
                            type: 'blocks',
                            localized: true,
                            blocks: [
                                HeadlineBlock,
                                Content,
                                MediaBlock,
                                MediaContent,
                                CallToAction,
                                TeaserBlock,
                                EventOverviewBlock,
                                CircleOverviewBlock,
                            ],
                            admin: {
                                initCollapsed: true,
                            },
                        },
                    ],
                },
            ],
        },

        {
            name: 'hiddenType',
            type: 'text',
            hidden: true,
            defaultValue: 'organisation',
        },
    ],
};

export default Organisation;

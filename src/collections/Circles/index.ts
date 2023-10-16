import type { CollectionConfig } from 'payload/types';
import { hasCircleAccess, hasCircleAccessOrPublished } from '../../access/checkCircle';
import { isAdmin, isAdminFieldLevel } from '../../access/isAdmin';
import { CallToAction } from '../../blocks/CallToAction';
import { Content } from '../../blocks/Content';
import { EventOverviewBlock } from '../../blocks/EventOverviewBlock';
import { HeadlineBlock } from '../../blocks/Headline';
import { MediaBlock } from '../../blocks/MediaBlock';
import { MediaContent } from '../../blocks/MediaContent';
import { TeaserBlock } from '../../blocks/Teaser';
import { revalidateCircle } from './hooks/revalidateCircle';

const Index: CollectionConfig = {
    slug: 'circles',

    labels: {
        singular: 'Kreis',
        plural: 'Kreise',
    },

    admin: {
        useAsTitle: 'name',
        group: 'B-Side',
        defaultColumns: ['name', 'organisation', 'updatedAt', '_status'],
    },

    versions: {
        drafts: true,
    },

    access: {
        create: isAdmin,
        read: hasCircleAccessOrPublished,
        update: hasCircleAccess('id'),
        delete: isAdmin,
    },

    hooks: {
        afterChange: [revalidateCircle],
    },

    fields: [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
        },
        {
            name: 'hiddenType',
            type: 'text',
            hidden: true,
            defaultValue: 'circle',
        },

        {
            type: 'tabs',
            tabs: [

                {
                    label: 'Allgemeines',
                    fields: [

                        {
                            name: 'organisation',
                            label: 'Körperschaft',
                            type: 'relationship',
                            relationTo: 'organisations',
                            required: true,
                        },
                        {
                            name: 'description',
                            label: 'Kurzbeschreibung',
                            type: 'text',
                            required: false,
                            defaultValue: '-',
                            admin: {
                                description: 'Diese Beschreibung wird in den Kreisübersichten in der zweiten Zeile angezeigt.',
                            },
                            access: {
                                read: () => true,
                                update: isAdminFieldLevel,
                                create: isAdminFieldLevel,
                            },
                        },
                        {
                            name: 'circleImage',
                            label: 'Bild',
                            type: 'upload',
                            relationTo: 'media',
                            filterOptions: {
                                mimeType: { contains: 'image' },
                            },
                            admin: {
                                description: 'Empfohlen: webp mit 1280x720px',
                            },
                        },
                        {
                            name: 'fallbackImage',
                            label: 'Fallback-Image',
                            type: 'text',
                            required: true,
                        },
                    ],
                },

                {
                    label: 'Seiten-Layout',
                    fields: [
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
                                TeaserBlock,
                                CallToAction,
                                EventOverviewBlock,
                            ],
                            admin: {
                                initCollapsed: true,
                            },
                        },
                    ],
                },
            ],
        },
    ],
};

export default Index;

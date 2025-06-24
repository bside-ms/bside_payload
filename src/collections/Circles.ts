import { kebabCase } from 'lodash';
import type { CollectionConfig } from 'payload/types';
import { hasCircleAccess } from '../access/checkCircle';
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin';
import { isUserOrPublished } from '../access/isUser';
import { CallToAction } from '../blocks/CallToAction';
import { Content } from '../blocks/Content';
import { EventOverviewBlock } from '../blocks/EventOverviewBlock';
import { HeadlineBlock } from '../blocks/Headline';
import { MediaBlock } from '../blocks/MediaBlock';
import { MediaContent } from '../blocks/MediaContent';
import { TeaserBlock } from '../blocks/Teaser';

const Circles: CollectionConfig = {
    slug: 'circles',

    labels: {
        singular: 'Kreis',
        plural: 'Kreise',
    },

    admin: {
        useAsTitle: 'name',
        group: 'B-Side',
        defaultColumns: ['name', 'organisation', 'updatedAt', '_status'],

        livePreview: {
            url: ({ data, locale }) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                return `${process.env.PAYLOAD_PUBLIC_SITE_URL}/${locale.code === 'de' ? '' : 'en/'}kreise/${kebabCase(data.name)}`;
            },
        },
    },

    versions: {
        drafts: true,
    },

    access: {
        create: isAdmin,
        read: isUserOrPublished,
        update: hasCircleAccess('id'),
        delete: isAdmin,
    },

    fields: [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
            localized: true,
            access: {
                read: () => true,
                update: isAdminFieldLevel,
            },
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
                            localized: true,
                            type: 'text',
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
                            label: 'Strichmännchen-Bild',
                            type: 'text',
                            required: true,
                            admin: {
                                description: 'Name eines auf dem Server liegenden Strichmännchen-Bildes',
                            },
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
                            localized: true,
                            blocks: [HeadlineBlock, Content, MediaBlock, MediaContent, TeaserBlock, CallToAction, EventOverviewBlock],
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

export default Circles;

import type { CollectionConfig } from 'payload/types';
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin';
import { isUserOrPublished } from '../access/isUser';
import { CallToAction } from '../blocks/CallToAction';
import { Content } from '../blocks/Content';
import { EventOverviewBlock } from '../blocks/EventOverviewBlock';
import { HeadlineBlock } from '../blocks/Headline';
import { MediaBlock } from '../blocks/MediaBlock';
import { MediaContent } from '../blocks/MediaContent';
import { Slider } from '../blocks/Slider';
import { TeaserBlock } from '../blocks/Teaser';
import formatSlug from '../utilities/formatSlug';

const News: CollectionConfig = {
    slug: 'news',

    labels: {
        singular: 'Neuigkeiten',
        plural: 'Neuigkeiten',
    },

    admin: {
        useAsTitle: 'title',
        group: 'Seiten',
    },

    versions: {
        drafts: true,
    },

    access: {
        create: isAdmin,
        read: isUserOrPublished,
        update: isAdmin,
        delete: isAdmin,
    },

    fields: [
        {
            name: 'title',
            type: 'text',
            label: {
                de: 'Titel',
                en: 'Title',
            },
            localized: true,
            required: true,
            access: {
                update: isAdminFieldLevel,
            },
        },

        {
            type: 'row',
            fields: [
                {
                    type: 'date',
                    name: 'newsDate',
                    label: {
                        de: 'Angezeigtes Datum',
                        en: 'Displayed Date',
                    },
                    required: true,
                    localized: true,
                    admin: {
                        width: '50%',
                        date: {
                            pickerAppearance: 'dayAndTime',
                            displayFormat: 'HH:mm / dd MMM yyy',
                            timeFormat: 'HH:mm',
                            timeIntervals: 30,
                        },
                    },
                },

                {
                    name: 'slug',
                    label: {
                        de: 'Slug',
                        en: 'Slug',
                    },
                    type: 'text',
                    index: true,
                    admin: {
                        width: '50%',
                    },
                    hooks: {
                        beforeValidate: [formatSlug('title')],
                    },
                },
            ],
        },

        {
            type: 'row',
            fields: [
                {
                    name: 'newsAuthor',
                    type: 'relationship',
                    relationTo: ['organisations', 'circles'],
                    required: false,
                    hasMany: true,
                    label: {
                        de: 'Verantwortlicher Kreis',
                        en: 'Responsible Circle',
                    },
                    admin: {
                        width: '50%',
                    },
                },
                {
                    name: 'newsCategory',
                    type: 'select',
                    hasMany: false,
                    required: true,
                    admin: {
                        width: '50%',
                    },
                    defaultValue: 'news',
                    options: [
                        { value: 'news', label: { de: 'Aktuelles', en: 'News' } },
                        { value: 'announcements', label: { de: 'Ankündigung', en: 'Announcements' } },
                    ],
                },
            ],
        },

        {
            name: 'newsImage',
            label: 'Bild',
            type: 'upload',
            relationTo: 'media',
            filterOptions: {
                mimeType: { contains: 'image' },
            },
            admin: {
                description: 'Quadratisches Bild!',
            },
        },

        {
            name: 'excerpt',
            label: 'Vorschautext',
            type: 'textarea',
            localized: true,
            required: true,
            maxLength: 450,
            admin: {
                description: 'Dieser Text wird auf der Übersichtsseite angezeigt. Maximal 450 Zeichen.',
            },
        },

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
                Slider,
            ],
            admin: {
                initCollapsed: true,
            },
        },
    ],
};

export default News;

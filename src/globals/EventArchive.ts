import type { GlobalConfig } from 'payload';
import { isOrganisator } from '@/access/isOrganisator';
import { HeadlineBlock } from '@/blocks/Headline';
import { Content } from '@/blocks/Content';
import { MediaBlock } from '@/blocks/MediaBlock';
import { MediaContent } from '@/blocks/MediaContent';
import { CallToAction } from '@/blocks/CallToAction';
import { TeaserBlock } from '@/blocks/Teaser';
import { EventOverviewBlock } from '@/blocks/EventOverviewBlock';
import { Slider } from '@/blocks/Slider';

export const EventArchive: GlobalConfig = {
    slug: 'event-archive',
    label: 'Veranstaltungsarchiv',

    admin: {
        group: 'Statisches',
        livePreview: {
            url: ({ locale }) => {
                return `${process.env.NEXT_PUBLIC_SITE_URL}${locale.code === 'de' ? '/events' : '/en/events'}`;
            },
        },
    },

    access: {
        read: () => true,
        update: isOrganisator,
    },

    fields: [
        {
            type: 'text',
            name: 'title',
            label: 'Titel',
            localized: true,
            required: true,
        },

        {
            name: 'headerImage',
            label: 'Bild',
            type: 'upload',
            relationTo: 'media',
            filterOptions: {
                mimeType: { contains: 'image' },
            },
            admin: {
                description: 'Wird über dem Archiv angezeigt. Empfohlen: webp mit 1120x288 px.',
            },
        },

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

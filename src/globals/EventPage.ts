import type { GlobalConfig } from 'payload/types';
import { isOrganisator } from '../access/isOrganisator';
import { CallToAction } from '../blocks/CallToAction';
import { Content } from '../blocks/Content';
import { EventOverviewBlock } from '../blocks/EventOverviewBlock';
import { HeadlineBlock } from '../blocks/Headline';
import { MediaBlock } from '../blocks/MediaBlock';
import { MediaContent } from '../blocks/MediaContent';
import { Slider } from '../blocks/Slider';
import { TeaserBlock } from '../blocks/Teaser';

export const EventPage: GlobalConfig = {
    slug: 'event-page',
    label: 'Veranstaltungsübersicht',

    admin: {
        group: 'Statisches',
        livePreview: {
            url: ({ locale }) => {
                return `${process.env.PAYLOAD_PUBLIC_SITE_URL}${locale.code === 'de' ? '/events' : '/en/events'}`;
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

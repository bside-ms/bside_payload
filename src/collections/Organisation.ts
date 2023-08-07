import type { CollectionConfig } from 'payload/types';
import { checkRole } from '../access/checkRole';
import { isAdmin } from '../access/isAdmin';
import { publishedOnly } from '../access/publishedOnly';
import { CallToAction } from '../blocks/CallToAction';
import { Content } from '../blocks/Content';
import { HeadlineBlock } from '../blocks/Headline';
import { MediaBlock } from '../blocks/MediaBlock';
import { MediaContent } from '../blocks/MediaContent';

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
                        },
                        {
                            name: 'shortName',
                            type: 'text',
                            required: true,
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

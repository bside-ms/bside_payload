import type { CollectionConfig } from 'payload/types';
import { checkRole } from '../access/checkRole';
import { isAdmin } from '../access/isAdmin';
import { publishedOnly } from '../access/publishedOnly';
import { Content } from '../blocks/Content';
import { MediaBlock } from '../blocks/MediaBlock';
import { MediaContent } from '../blocks/MediaContent';
import MediaSlider from '../blocks/MediaSlider';

const Circles: CollectionConfig = {
    slug: 'circles',

    labels: {
        singular: 'Kreis',
        plural: 'Kreise',
    },

    admin: {
        useAsTitle: 'name',
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
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
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
                            name: 'color',
                            label: 'Akzentfarbe',
                            type: 'text',
                            required: false,
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
                                Content,
                                MediaBlock,
                                MediaContent,
                                MediaSlider,
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};

export default Circles;

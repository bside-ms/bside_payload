import type { CollectionConfig } from 'payload/types';
import { checkRole } from '../access/checkRole';
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin';
import { isEditor } from '../access/isEditor';
import { publishedOnly } from '../access/publishedOnly';
import { CallToAction } from '../blocks/CallToAction';
import { Content } from '../blocks/Content';
import { HeadlineBlock } from '../blocks/Headline';
import { MediaBlock } from '../blocks/MediaBlock';
import { MediaContent } from '../blocks/MediaContent';

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
        update: isEditor,
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
                            name: 'color',
                            label: 'Akzentfarbe',
                            type: 'text',
                            required: true,
                            defaultValue: '#11ff11',
                            admin: {
                                description: 'Diese Farbe wird in den Kreisübersichten als Hintergrundfarbe verwendet. Beispiel: #f55511',
                            },
                            access: {
                                read: () => true,
                                update: isAdminFieldLevel,
                                create: isAdminFieldLevel,
                            },
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
    ],
};

export default Circles;

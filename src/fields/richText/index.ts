import { slateEditor } from '@payloadcms/richtext-slate';
import type { RichTextElement, RichTextLeaf } from '@payloadcms/richtext-slate/dist/types';
import type { RichTextField } from 'payload/dist/fields/config/types';
import deepMerge from '../../utilities/deepMerge';
import elements from './elements';
import leaves from './leaves';

type RichText = (
    overrides?: Partial<RichTextField>,
    additions?: {
        elements?: Array<RichTextElement>;
        leaves?: Array<RichTextLeaf>;
    },
) => RichTextField;

const richText: RichText = (
    overrides,
    additions = {
        elements: [],
        leaves: [],
    },
) =>
    deepMerge<RichTextField, Partial<RichTextField>>(
        {
            name: 'richText',
            type: 'richText',
            label: 'Beschreibung',
            required: true,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            editor: slateEditor({
                admin: {
                    upload: {
                        collections: {
                            media: {
                                fields: [
                                    {
                                        type: 'richText',
                                        name: 'caption',
                                        label: 'Caption',
                                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                        editor: slateEditor({
                                            admin: {
                                                elements: [...elements],
                                                leaves: [...leaves],
                                            },
                                        }),
                                    },
                                    {
                                        type: 'radio',
                                        name: 'alignment',
                                        label: 'Alignment',
                                        options: [
                                            {
                                                label: 'Left',
                                                value: 'left',
                                            },
                                            {
                                                label: 'Center',
                                                value: 'center',
                                            },
                                            {
                                                label: 'Right',
                                                value: 'right',
                                            },
                                        ],
                                    },
                                ],
                            },
                        },
                    },

                    elements: [...elements, ...(additions.elements ?? [])],
                    leaves: [...leaves, ...(additions.leaves ?? [])],

                    link: {
                        fields: [
                            {
                                label: 'Anzeigetyp',
                                name: 'appearance',
                                type: 'select',
                                defaultValue: 'link',
                                options: [
                                    {
                                        label: 'Link',
                                        value: 'link',
                                    },
                                    {
                                        label: 'Button',
                                        value: 'button',
                                    },
                                ],
                                admin: {
                                    width: '50%',
                                },
                            },
                        ],
                    },
                },
            }),
        },

        // @ts-expect-error Undefined is not assignable to type 'Partial<RichTextField>'.
        overrides,
    );

export default richText;

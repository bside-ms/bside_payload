import type { Field } from 'payload';
import formatSlug from '../utilities/formatSlug';
import { merge } from 'lodash';

type Slug = (fieldToUse?: string, overrides?: Partial<Field>) => Field;

export const slugField: Slug = (fieldToUse = 'title', overrides = {}) =>
    merge<Field, Partial<Field>>(
        {
            name: 'slug',
            label: 'Slug',
            type: 'text',
            index: true,
            admin: {
                position: 'sidebar',
            },
            hooks: {
                beforeValidate: [formatSlug(fieldToUse)],
            },
        },
        overrides,
    );

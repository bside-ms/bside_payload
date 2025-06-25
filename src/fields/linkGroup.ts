import type { ArrayField, Field } from 'payload';
import type { LinkAppearances } from './link';
import link from './link';
import { merge } from 'lodash';

type LinkGroupType = (options?: { overrides?: Partial<ArrayField>; appearances?: Array<LinkAppearances> | false }) => Field;

const linkGroup: LinkGroupType = ({ overrides = {}, appearances } = {}) => {
    const generatedLinkGroup: Field = {
        name: 'links',
        type: 'array',
        fields: [
            link({
                appearances,
            }),
        ],
    };

    return merge(generatedLinkGroup, overrides);
};

export default linkGroup;

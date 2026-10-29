import kebabCase from 'lodash-es/kebabCase';
import isNotEmptyString from '@/utilities/isNotEmptyString';

// Must match the website: `{id.slice(-4)}-{kebabCase(slug || title)}` (lib/events/createEventSlug.ts).
const createEventSlug = (slug: string, title: string, id: string): string => {
    if (isNotEmptyString(slug)) {
        return `${id.slice(-4)}-${kebabCase(slug)}`;
    }

    return `${id.slice(-4)}-${kebabCase(title)}`;
};

export default createEventSlug;

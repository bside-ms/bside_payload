import kebabCase from 'lodash-es/kebabCase';
import isNotEmptyString from '@/utilities/isNotEmptyString';

const createEventSlug = (slug: string, title: string, id: string): string => {
    if (isNotEmptyString(slug)) {
        return slug;
    }

    return `${kebabCase(title)}-${id.slice(-4)}`;
};

export default createEventSlug;

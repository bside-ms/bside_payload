import kebabCase from 'lodash-es/kebabCase';
import isNotEmptyString from '@/utilities/isNotEmptyString';

export const createNewsSlug = (slug: string, id: string, title: string): string => {
    if (isNotEmptyString(slug)) {
        return `${id.slice(-4)}-${kebabCase(slug)}`;
    }

    return `${id.slice(-4)}-${kebabCase(title)}`;
};

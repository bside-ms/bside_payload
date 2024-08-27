import { kebabCase } from 'lodash';
import isNotEmptyString from './isNotEmptyString';

const createEventSlug = (slug: string, title: string, id: string): string => {

    if (isNotEmptyString(slug)) {
        return slug;
    }

    return `${kebabCase(title)}-${id.slice(-4)}`;
};

export default createEventSlug;

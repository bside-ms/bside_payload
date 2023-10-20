import isNotEmptyString from './isNotEmptyString';
import { kebabCase } from 'lodash';

const createEventSlug = (slug: string, title: string, id: string): string => {

    if (isNotEmptyString(slug)) {
        return slug;
    }

    return `${kebabCase(title)}-${id.slice(-4)}`;
};

export default createEventSlug;

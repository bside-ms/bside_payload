import type { Access } from 'payload';
import type { ApiUser, User } from '../payload-types';
import { checkRole } from './checkRole';

export const isApiUser: Access<ApiUser | User> = ({ data: user }) => {
    if (user === undefined) {
        return false;
    }

    const collection: string = user.collection;

    if (collection === 'api-users') {
        return true;
    }

    if (collection === 'users' && checkRole(user, ['admin'])) {
        return true;
    }

    return false;
};

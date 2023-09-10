import type { Access } from 'payload/types';
import type { ApiUser, User } from '../payload-types';
import { checkRole } from './checkRole';

export const isApiUser: Access<ApiUser | User> = ({ req: { user } }) => {
    if (user === undefined) {
        return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const collection: string = user.collection as string;

    if (collection === 'api-users') {
        return true;
    }

    if (collection === 'users' && checkRole(user as User, ['admin'])) {
        return Boolean(true);
    }

    return false;
};


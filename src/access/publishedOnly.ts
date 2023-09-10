import type { Access } from 'payload/config';
import type { User } from '../payload-types';
import { checkRole } from './checkRole';

export const publishedOnly: Access<User> = ({ req: { user } }) => {
    if (user !== undefined) {

        if (user.collection === 'users') {
            if (checkRole(user as User, ['admin'])) {
                return Boolean(true);
            }
        }

        if (user.collection === 'api-users') {
            return true;
        }
    }

    return {
        _status: {
            equals: 'published',
        },
    };
};

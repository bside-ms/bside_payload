import type { Access } from 'payload/types';
import type { User } from '../payload-types';
import { checkRole } from './checkRole';

export const publishedOnly: Access<User> = ({ req: { user } }) => {
    if (user !== undefined) {

        if (user.collection === 'users') {
            if (checkRole(user as User, ['admin'])) {
                return Boolean(true);
            }
        }
    }

    return {
        _status: {
            equals: 'published',
        },
    };
};

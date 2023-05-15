import type { Access } from 'payload/config';
import type { User } from '../payload-types';
import { checkRole } from './checkRole';

export const publishedOnly: Access<User> = ({ req: { user } }) => {

    if (user !== undefined && checkRole(user as User, ['admin'])) {
        return Boolean(true);
    }

    return {
        _status: {
            equals: 'published',
        },
    };
};

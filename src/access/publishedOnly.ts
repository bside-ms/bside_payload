import type { Access } from 'payload/config';
import type { User } from '../payload-types';
import { checkRole } from './checkRole';

export const publishedOnly: Access<User> = ({ req: { user } }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (checkRole(user, ['admin'])) {
        return Boolean(true);
    }

    return {
        _status: {
            equals: 'published',
        },
    };
};

import type { Access } from 'payload/config';
import type { User } from '../payload-types';
import { checkRole } from './checkRole';
import { logger } from '@smithy/smithy-client';

export const publishedOnly: Access<User> = ({ req: { user } }) => {

    logger.warn(user);

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

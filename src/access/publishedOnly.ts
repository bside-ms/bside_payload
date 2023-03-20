import type { Access } from 'payload/config';
import type { User } from '../payload-types';

export const publishedOnly: Access<
    any, // eslint-disable-line @typescript-eslint/no-explicit-any
    User
> = ({ req: { user } }) => {
    if (user?.isAdmin ?? false) {
        return true;
    }

    return {
        _status: {
            equals: 'published',
        },
    };
};

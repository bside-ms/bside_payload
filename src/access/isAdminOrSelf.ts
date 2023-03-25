import type { Access, FieldAccess } from 'payload/types';
import type { User } from '../payload-types';
import { checkRole } from './checkRole';

export const isAdminOrSelf: Access<User> = ({ req: { user } }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (checkRole(user, ['admin'])) {
        return Boolean(true);
    }

    // If any other type of user, only provide access to themselves
    return {
        id: {
            equals: user.id,
        },
    };
};

export const isAdminOrSelfFieldLevel: FieldAccess<{ id: string }, unknown, User> = ({
    req: { user },
    id,
}) => {
    if (user) {
        // Return true or false based on if the user has an admin role
        if (checkRole(user, ['admin'])) {
            return Boolean(true);
        }

        if (user.id === id) {
            return true;
        }
    }

    return false;
};

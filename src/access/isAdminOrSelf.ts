import type { Access, FieldAccess } from 'payload/types';
import type { User } from '../payload-types';
import { checkRole } from './checkRole';

export const isAdminOrSelf: Access<User> = ({ req: { user } }) => {
    if (user === undefined) {
        return false;
    }

    if (checkRole(user as User, ['admin'])) {
        return Boolean(true);
    }

    return {
        id: {
            equals: (user as User).id,
        },
    };
};

export const isAdminOrSelfFieldLevel: FieldAccess<{ id: string }, unknown, User> = ({
    req: { user },
    id,
}) => {
    if (user) {
        if (checkRole(user as User, ['admin'])) {
            return Boolean(true);
        }

        if (user.id === id) {
            return true;
        }
    }

    return false;
};

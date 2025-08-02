import type { Access, FieldAccess } from 'payload';
import type { User } from '@/payload-types';
import { checkRole } from '@/access/checkRole';

export const isAdminOrSelf: Access<User> = ({ data: user }) => {
    if (user === undefined) {
        return false;
    }

    if (checkRole(user, ['admin'])) {
        return true;
    }

    return {
        id: {
            equals: user.id,
        },
    };
};

export const isAdminOrSelfFieldLevel: FieldAccess<{ id: string }, User> = ({ id, siblingData: user }) => {
    if (user !== undefined) {
        if (checkRole(user, ['admin'])) {
            return true;
        }

        if (user.id === id) {
            return true;
        }
    }

    return false;
};

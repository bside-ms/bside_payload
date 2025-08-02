import type { Access, FieldAccess } from 'payload';
import type { User } from '@/payload-types';
import { checkRole } from '@/access/checkRole';

export const isAdmin: Access<User> = ({ data: user }): boolean => {
    if (user === undefined) {
        return false;
    }

    if (checkRole(user, ['admin'])) {
        return true;
    }

    return false;
};

export const isAdminFieldLevel: FieldAccess<{ id: string }, User> = ({ data: user }) => {
    if (user === undefined) {
        return false;
    }

    if (checkRole(user, ['admin'])) {
        return true;
    }

    return false;
};

import type { Access, FieldAccess } from 'payload';
import type { User } from '../payload-types';
import { checkRole } from './checkRole';

export const isAdmin: Access<User> = ({ req: { user } }): boolean => {
    if (user === undefined) {
        return false;
    }

    if (checkRole(user, ['admin'])) {
        return Boolean(true);
    }

    return false;
};

export const isAdminFieldLevel: FieldAccess<{ id: string }, User> = ({ req: { user } }) => {
    if (user === undefined) {
        return false;
    }

    if (checkRole(user, ['admin'])) {
        return Boolean(true);
    }

    return false;
};

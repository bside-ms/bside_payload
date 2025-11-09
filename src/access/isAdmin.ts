import type { Access, FieldAccess } from 'payload';
import { checkRole } from '@/access/checkRole';
import isUserObjectWithRoles from '@/access/isUserObjectWithRoles';

export const isAdmin: Access = ({ req: { user } }): boolean => {
    if (!isUserObjectWithRoles(user)) {
        return false;
    }

    if (checkRole(user, ['admin'])) {
        return true;
    }

    return false;
};

export const isAdminFieldLevel: FieldAccess = ({ req: { user } }) => {
    if (!isUserObjectWithRoles(user)) {
        return false;
    }

    if (checkRole(user, ['admin'])) {
        return true;
    }

    return false;
};

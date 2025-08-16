import type { Access, FieldAccess } from 'payload';
import { checkRole } from '@/access/checkRole';
import isUserObjectWithRoles from '@/access/isUserObjectWithRoles';

export const isAdminOrSelf: Access = ({ req: { user } }) => {
    if (!isUserObjectWithRoles(user)) {
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

export const isAdminOrSelfFieldLevel: FieldAccess<{ id: string }> = ({ id, req: { user } }) => {
    if (isUserObjectWithRoles(user)) {
        if (checkRole(user, ['admin'])) {
            return true;
        }

        if (user.id === id) {
            return true;
        }
    }

    return false;
};

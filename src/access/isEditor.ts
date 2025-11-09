import type { Access, FieldAccess } from 'payload';
import { checkRole } from '@/access/checkRole';
import isUserObjectWithRoles from '@/access/isUserObjectWithRoles';

export const isEditor: Access = ({ req: { user } }): boolean => {
    if (!isUserObjectWithRoles(user)) {
        return false;
    }

    if (checkRole(user, ['admin', 'editor'])) {
        return true;
    }

    return false;
};

export const isEditorFieldLevel: FieldAccess = ({ req: { user } }) => {
    if (!isUserObjectWithRoles(user)) {
        return false;
    }

    if (checkRole(user, ['admin', 'editor'])) {
        return true;
    }

    return false;
};

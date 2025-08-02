import type { Access, FieldAccess } from 'payload';
import type { User } from '@/payload-types';
import { checkRole } from '@/access/checkRole';

export const isEditor: Access<User> = ({ data: user }): boolean => {
    if (user === undefined) {
        return false;
    }

    if (checkRole(user, ['admin', 'editor'])) {
        return true;
    }

    return false;
};

export const isEditorFieldLevel: FieldAccess<{ id: string }, User> = ({ data: user }) => {
    if (user === undefined) {
        return false;
    }

    if (checkRole(user, ['admin', 'editor'])) {
        return true;
    }

    return false;
};

import type { Access, FieldAccess } from 'payload/types';
import type { User } from '../payload-types';
import { checkRole } from './checkRole';

export const isEditor: Access<User> = ({ req: { user } }): boolean => {
    if (user === undefined) {
        return false;
    }

    if (checkRole(user as User, ['admin', 'editor'])) {
        return Boolean(true);
    }

    return false;
};

export const isEditorFieldLevel: FieldAccess<{ id: string }, User> = ({
    req: { user },
}) => {
    if (user === undefined) {
        return false;
    }

    if (checkRole(user as User, ['admin', 'editor'])) {
        return Boolean(true);
    }

    return false;
};

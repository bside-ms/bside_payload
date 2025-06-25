import type { Access, FieldAccess } from 'payload';
import type { User } from '../payload-types';
import { checkRole } from './checkRole';

export const isOrganisator: Access<User> = ({ req: { user } }): boolean => {
    if (user === undefined) {
        return false;
    }

    if (checkRole(user, ['admin', 'organisator'])) {
        return Boolean(true);
    }

    return false;
};

export const isOrganisatorFieldLevel: FieldAccess<{ id: string }, User> = ({ req: { user } }) => {
    if (user === undefined) {
        return false;
    }

    if (checkRole(user, ['admin', 'organisator'])) {
        return Boolean(true);
    }

    return false;
};

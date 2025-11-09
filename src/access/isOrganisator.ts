import type { Access } from 'payload';
import { checkRole } from '@/access/checkRole';
import isUserObjectWithRoles from '@/access/isUserObjectWithRoles';

export const isOrganisator: Access = ({ req: { user } }): boolean => {
    if (!isUserObjectWithRoles(user)) {
        return false;
    }

    if (checkRole(user, ['admin', 'organisator'])) {
        return true;
    }

    return false;
};

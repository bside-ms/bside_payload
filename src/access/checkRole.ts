import type { User } from '../payload-types';

export const checkRole = (user: User, allRoles: User['roles'] = []): boolean => {
    if (
        allRoles.some(role => {
            return user.roles.includes(role);
        })
    ) {
        return true;
    }

    return false;
};

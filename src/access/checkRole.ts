import { User } from '@/payload-types';

export const checkRole = (user?: Partial<User>, allRoles: User['roles'] = []): boolean => {
    return user?.roles !== undefined && allRoles.some((role) => user.roles?.includes(role));
};

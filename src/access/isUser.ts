import type { Access, FieldAccess } from 'payload';
import type { User } from '@/payload-types';
import { checkRole } from '@/access/checkRole';
import isUserObjectWithRoles from '@/access/isUserObjectWithRoles';

export const isUser: Access = ({ req: { user } }) => {
    if (!isUserObjectWithRoles(user)) {
        return false;
    }

    if (checkRole(user, ['admin'])) {
        return true;
    }

    if (checkRole(user, ['editor'])) {
        return true;
    }

    if (checkRole(user, ['public'])) {
        return true;
    }

    return false;
};

export const isUserFieldLevel: FieldAccess = ({ req: { user } }) => {
    if (!isUserObjectWithRoles(user)) {
        return false;
    }

    if (checkRole(user, ['admin'])) {
        return true;
    }

    if (checkRole(user, ['editor'])) {
        return true;
    }

    if (checkRole(user, ['public'])) {
        return true;
    }

    return false;
};

export const isUserOrPublished: Access<User> = ({ req: { user } }) => {
    if (!isUserObjectWithRoles(user)) {
        return {
            _status: {
                equals: 'published',
            },
        };
    }

    if (checkRole(user, ['admin'])) {
        return true;
    }

    if (checkRole(user, ['editor'])) {
        return true;
    }

    if (checkRole(user, ['public'])) {
        return true;
    }

    return {
        _status: {
            equals: 'published',
        },
    };
};

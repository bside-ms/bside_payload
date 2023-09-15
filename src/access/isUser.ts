import type { Access, FieldAccess } from 'payload/types';
import type { User } from '../payload-types';
import { checkRole } from './checkRole';

export const isUser: Access<User> = ({ req: { user } }) => {
    if (user === undefined) {
        return false;
    }

    const currentUser: User = user as User;

    if (checkRole(currentUser, ['admin'])) {
        return Boolean(true);
    }

    if (checkRole(currentUser, ['editor'])) {
        return Boolean(true);
    }

    if (checkRole(currentUser, ['public'])) {
        return Boolean(true);
    }

    return false;
};

export const isUserField: FieldAccess<{ id: string }, User> = ({
    req: { user },
}) => {
    if (user === undefined) {
        return false;
    }

    if (checkRole(user as User, ['admin'])) {
        return Boolean(true);
    }

    if (checkRole(user as User, ['editor'])) {
        return Boolean(true);
    }

    if (checkRole(user as User, ['public'])) {
        return Boolean(true);
    }

    return false;
};

export const isUserOrPublished: Access<User> = ({ req: { user } }) => {
    if (user === undefined) {
        return {
            _status: {
                equals: 'published',
            },
        };
    }

    const currentUser: User = user as User;

    if (checkRole(currentUser, ['admin'])) {
        return Boolean(true);
    }

    if (checkRole(currentUser, ['editor'])) {
        return Boolean(true);
    }

    if (checkRole(currentUser, ['public'])) {
        return Boolean(true);
    }

    return {
        _status: {
            equals: 'published',
        },
    };
};

import type { Access, FieldAccess } from 'payload';
import type { User } from '../payload-types';
import { checkRole } from './checkRole';

export const isUser: Access<User> = ({ data: user }) => {
    if (user === undefined) {
        return false;
    }

    if (checkRole(user, ['admin'])) {
        return Boolean(true);
    }

    if (checkRole(user, ['editor'])) {
        return Boolean(true);
    }

    if (checkRole(user, ['public'])) {
        return Boolean(true);
    }

    return false;
};

export const isUserField: FieldAccess<{ id: string }, User> = ({ data: user }) => {
    if (user === undefined) {
        return false;
    }

    if (checkRole(user, ['admin'])) {
        return Boolean(true);
    }

    if (checkRole(user, ['editor'])) {
        return Boolean(true);
    }

    if (checkRole(user, ['public'])) {
        return Boolean(true);
    }

    return false;
};

export const isUserOrPublished: Access<User> = ({ data: user }) => {
    if (user === undefined) {
        return {
            _status: {
                equals: 'published',
            },
        };
    }

    if (checkRole(user, ['admin'])) {
        return Boolean(true);
    }

    if (checkRole(user, ['editor'])) {
        return Boolean(true);
    }

    if (checkRole(user, ['public'])) {
        return Boolean(true);
    }

    return {
        _status: {
            equals: 'published',
        },
    };
};

import type { Access, FieldAccess } from 'payload/types';
import type { User } from '../payload-types';

// This should only be used to create the initial admin user.
// It can be deleted afterwards.

export const isTrue: Access<any, User> = () => {
    return Boolean(true);
};

export const isTrueFieldLevel: FieldAccess<{ id: string }, unknown, User> = () => {
    return Boolean(true);
};

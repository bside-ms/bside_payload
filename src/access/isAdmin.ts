import type { Access, FieldAccess } from 'payload/types';
import type { User } from '../payload-types';

export const isAdmin: Access<
    any, // eslint-disable-line @typescript-eslint/no-explicit-any
    User
> = ({ req: { user } }) => {
    return Boolean(user?.isAdmin ?? false);
};

export const isAdminFieldLevel: FieldAccess<{ id: string }, unknown, User> = ({
    req: { user },
}) => {
    return Boolean(user?.isAdmin ?? false);
};

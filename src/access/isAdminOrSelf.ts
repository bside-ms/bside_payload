import type { Access } from 'payload/config';
import type { FieldAccess } from 'payload/types';
import type { User } from '../payload-types';

export const isAdminOrSelf: Access = ({ req: { user } }) => {
    // Need to be logged in
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (user) {
        // If user has role of 'admin'
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (user.roles?.includes('admin') ?? false) {
            return true;
        }

        // If any other type of user, only provide access to themselves
        return {
            id: {
                equals: user.id,
            },
        };
    }

    // Reject everyone else
    return false;
};

export const isAdminOrSelfFieldLevel: FieldAccess<{ id: string }, unknown, User> = ({
    req: { user },
    id,
}) => {
    if (user) {
        // Return true or false based on if the user has an admin role
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (user.roles?.includes('admin')) {
            return true;
        }
        if (user.id === id) {
            return true;
        }
    }

    return false;
};

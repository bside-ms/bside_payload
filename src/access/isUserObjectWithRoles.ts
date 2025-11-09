import type { User as BaseUser } from 'payload';
import type { User } from '@/payload-types';

const isUserObjectWithRoles = (user: BaseUser | null): user is User & { collection: string } => {
    if (user === null) {
        return false;
    }

    if (['roles'].every((attribute) => Object.keys(user).includes(attribute))) {
        return true;
    }

    console.warn('User object unexpectingly does not have all necessary attributes', JSON.stringify(user));

    return false;
};

export default isUserObjectWithRoles;

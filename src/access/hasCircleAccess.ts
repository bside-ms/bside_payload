import type { Access } from 'payload';
import type { User } from '../payload-types';
import { checkRole } from './checkRole';

export const hasCircleAccess =
    (circleIdFieldName: string = 'circle'): Access<User> =>
    ({ data: user }) => {
        if (user === undefined) {
            return false;
        }

        if (checkRole(user, ['admin'])) {
            return true;
        }

        if (checkRole(user, ['editor'])) {
            return true;
        }

        const circles = user.circles;
        if (circles !== undefined && circles !== null && circles.length >= 0) {
            return {
                or: [
                    {
                        [circleIdFieldName]: {
                            in: circles.map((circle) => (typeof circle === 'object' ? circle.id : circle)),
                        },
                    },
                    {
                        [circleIdFieldName]: {
                            exists: false,
                        },
                    },
                ],
            };
        }

        return false;
    };

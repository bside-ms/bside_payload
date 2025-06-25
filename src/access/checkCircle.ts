import type { Access } from 'payload';
import type { Circle, User } from '../payload-types';
import { checkRole } from './checkRole';

export const hasCircleAccessOrPublished: Access<User> = ({ data: user }) => {
    if (user === undefined) {
        return false;
    }

    if (checkRole(user, ['admin'])) {
        return true;
    }

    if (checkRole(user, ['editor'])) {
        return true;
    }

    let circles = user.circles;
    if (circles === undefined || circles === null || circles.length <= 0) {
        circles = [];
    }

    return {
        or: [
            {
                id: {
                    in: circles.map((circle) => (typeof circle === 'object' ? circle.id : circle)),
                },
            },
            {
                id: {
                    exists: false,
                },
            },
            {
                _status: {
                    equals: 'published',
                },
            },
        ],
    };
};

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

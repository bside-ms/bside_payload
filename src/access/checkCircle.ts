import type { Access } from 'payload/types';
import type { Circle, User } from '../payload-types';
import { checkRole } from './checkRole';

export const hasCircleAccessOrPublished: Access = ({ req: { user } }): (boolean | {
    or: Array<{ id: { in: Array<string> | Array<Circle> } } | { id: { exists: boolean } } | { _status: { equals: string } }>;
}) => {
    if (user === undefined) {
        return false;
    }

    if (checkRole(user as User, ['admin'])) {
        return true;
    }

    if (checkRole(user as User, ['editor'])) {
        return true;
    }

    let circles = (user as User).circles;
    if (circles === undefined || circles === null || circles.length <= 0) {
        circles = [];
    }

    return {
        or: [
            {
                id: {
                    in: circles.map(circle => typeof circle === 'object' ? circle.id : circle),
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

export const hasCircleAccess = (circleIdFieldName: string = 'circle'): Access => ({ req: { user } }) => {
    if (user === undefined) {
        return false;
    }

    if (checkRole(user as User, ['admin'])) {
        return true;
    }

    if (checkRole(user as User, ['editor'])) {
        return true;
    }

    const circles = (user as User).circles;
    if (circles !== undefined && circles !== null && circles.length >= 0) {
        return {
            or: [
                {
                    [circleIdFieldName]: {
                        in: circles.map(circle => typeof circle === 'object' ? circle.id : circle),
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

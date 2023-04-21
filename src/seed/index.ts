import type { Payload } from 'payload';

export const seed = async (payload: Payload): Promise<void> => {
    await payload.create({
        collection: 'users',
        data: {
            email: 'admin@admin.local',
            password: 'test',
            roles: ['admin'],
            firstName: 'admin',
            lastName: 'admin',
        },
    });

    await payload.create({
        collection: 'api-users',
        data: {
            email: 'api@admin.local',
            password: 'test',
            enableAPIKey: true,
        },
    });
};

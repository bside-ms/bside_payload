import type { Payload } from 'payload';

export const seed = async (payload: Payload): Promise<void> => {

    //
    // USERS
    //

    payload.logger.debug('Seeding: Users');
    await payload.create({
        collection: 'users',
        data: {
            email: 'test@b-side.ms',
            password: 'test',
            firstName: 'admin',
            lastName: 'admin',
            roles: ['public', 'admin'],
        },
    });
};

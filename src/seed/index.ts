import type { Payload } from 'payload';

export const seed = async (payload: Payload): Promise<void> => {

    //
    // USERS
    //

    payload.logger.debug('Seeding: Users');
    await payload.create({
        collection: 'users',
        data: {
            email: 'admin@b-side.ms',
            password: 'test',
            firstName: 'admin',
            lastName: 'admin',
            roles: ['admin'],
        },
    });

    //
    // Events
    //

    payload.logger.debug('Seeding: Events');
    await payload.create({
        collection: 'events',
        data: {
            title: 'Zukunftsplenum May',
            eventLocation: 'B-Side',
            eventDate: '2023-05-02T22:00:00.000Z',
            eventStart: '2023-05-02T16:00:00.740Z',
            eventEnd: '2023-05-02T18:00:00.499Z',
            richText: [
                {
                    children: [
                        {
                            text: 'Wichtiges Plenum',
                        },
                    ],
                },
            ],
            _status: 'published',
        },
    });

    await payload.create({
        collection: 'events',
        data: {
            title: 'Zukunftsplenum Juli',
            eventLocation: 'B-Side',
            eventDate: '2023-07-04T22:00:00.000Z',
            eventStart: '2023-07-04T16:00:00.740Z',
            eventEnd: '2023-07-04T18:00:00.499Z',
            richText: [
                {
                    children: [
                        {
                            text: 'Wichtiges Plenum 2',
                        },
                    ],
                },
            ],
            _status: 'published',
        },
    });

    payload.logger.debug('Seeding: Redirects');
    await payload.create({
        collection: 'redirects',
        data: {
            from: '/xd',
            to: {
                type: 'custom',
                url: 'https://xd.adobe.com/view/32a216ce-faaa-4e26-aba4-b779e658f173-67f1/',
            },
        },
    });
};

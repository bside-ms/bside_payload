import type { Payload } from 'payload';

export const seed = async (payload: Payload): Promise<void> => {

    //
    // USERS
    //

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

    //
    // Menu und Page
    //

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { id: impressumId } = await payload.create({
        collection: 'pages',
        data: {
            title: 'Impressum',
            richText: [
                {
                    children: [
                        {
                            text: 'Impressum',
                        },
                    ],
                },
                {
                    children: [
                        {
                            text: '',
                        },
                    ],
                },
                {
                    children: [
                        {
                            text: 'Dies ist das Impressum.',
                        },
                    ],
                },
            ],
            _status: 'published',
            slug: 'impressum',
            breadcrumbs: [
                {
                    url: '/impressum',
                    label: 'Impressum',
                },
            ],
        },
    });

    await payload.updateGlobal({
        slug: 'main-menu',
        data: {
            navItems: [
                {
                    link: {
                        type: 'custom',
                        url: '/haus',
                        label: 'Die B-Side',
                    },
                },
                {
                    link: {
                        type: 'custom',
                        url: '/events',
                        label: 'Veranstaltungen',
                    },
                },
            ],
        },
    });

    //
    // Events
    //

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

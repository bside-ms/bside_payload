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

    await payload.create({
        collection: 'pages',
        data: {
            title: 'Impressum',
            // eslint-disable-next-line max-len
            richText: [{ children: [{ text: 'B-Side GmbH\n', bold: true }, { text: 'Am Hawerkamp 29\n48155 Münster' }] }, { children: [{ text: '' }] }, { children: [{ text: '' }, { type: 'link', linkType: 'custom', url: 'mailto://placeholder@local.host', children: [{ text: 'placeholder@local.host' }] }, { text: '', bold: true }] }, { children: [{ text: '' }] }, { children: [{ text: 'Vertreten durch die Geschäftsführer:\nGF1\nGF2' }] }, { children: [{ text: '' }] }, { children: [{ text: 'Wir sind nicht bereit und nicht verpflichtet, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.' }] }, { children: [{ text: '' }] }, { children: [{ text: 'Entwicklung: TBA\nKonzept & Design: TBA' }] }],
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

    await payload.create({
        collection: 'pages',
        data: {
            title: 'Datenschutzerklärung',
            // eslint-disable-next-line max-len
            richText: [{ children: [{ text: 'Deine Daten gehören dir. Und das sollen sie auch bleiben. Dennoch müssen wir einige deiner Daten für bestimmte von uns angebotene Dienstleistungen erfassen.' }] }, { children: [{ text: 'Cookies' }], type: 'h3' }, { children: [{ text: 'Wir setzen keine Cookies.' }] }, { children: [{ text: 'Tracking' }], type: 'h3' }, { children: [{ text: 'Wir mögen kein Tracking. Und wir glauben nicht, dass Cookies oder Tracking in irgendeiner Weise zur Verbesserung unserer Websites beitragen. Die einzigen Informationen, die wir speichern, sind Zugriffsprotokolle unserer Server zur Fehlerbehebung. Diese Daten enthalten Teile deiner IP-Adresse.' }] }, { type: 'h3', children: [{ text: 'Gesetzliche Anforderungen und deine Rechte' }] }, { children: [{ text: 'Wir verarbeiten personenbezogene Daten auf der Grundlage von Art. 6 Abs.. 1 lit. f DSGVO. Wir gewähren dir Zugriff auf deine bei uns gespeicherten Daten. Außerdem aktualisieren und löschen wir deine Daten auf deinen Wunsch.' }] }, { children: [{ text: 'Kontakt für Fragen zum Datenschutz' }], type: 'h3' }, { children: [{ text: 'Für alle Anfragen, Fragen oder Beschwerden wende dich bitte an ' }, { type: 'link', linkType: 'custom', url: 'mailto://placeholder@local.host', children: [{ text: 'placeholder@local.host' }] }, { text: '.' }] }, { children: [{ text: 'Deine Daten werden mit größter Sorgfalt behandelt und der Zugang zu ihnen ist streng auf die Personen beschränkt, die sie wirklich benötigen.' }] }, { children: [{ text: '\n' }] }],
            slug: 'datenschutz',
            breadcrumbs: [
                {
                    url: '/datenschutz',
                    label: 'Datenschutzerklärung',
                },
            ],
            _status: 'published',
        },
    });

    // Main Menu

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

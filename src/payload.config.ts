import path from 'path';
import * as process from 'process';
import nestedPages from '@payloadcms/plugin-nested-docs';
import redirects from '@payloadcms/plugin-redirects';
import { buildConfig } from 'payload/config';
import Circles from './collections/Circles';
import Events from './collections/Events';
import Media from './collections/Media';
import Organisation from './collections/Organisation';
import Pages from './collections/Pages';
import ApiUsers from './collections/Users/ApiUsers';
import Users from './collections/Users/Users';
import BeforeDashboard from './components/BeforeDashboard';
import BeforeLogin from './components/BeforeLogin';
import { Footer } from './globals/Footer';
import { MainMenu } from './globals/MainMenu';

export default buildConfig({
    admin: {
        user: Users.slug,

        components: {
            beforeLogin: [
                BeforeLogin,
            ],

            beforeDashboard: [
                BeforeDashboard,
            ],
        },
    },

    // collections in Payload are synonymous with database tables, models or entities from other frameworks and systems
    collections: [

        // Collections
        Events,
        Circles,
        Organisation,

        // Other
        Media,
        Users,

        // Administration
        Pages,

        // Authentication
        ApiUsers,
    ],

    // globals are a single-instance collection, often used for navigation or site settings that live in one place
    globals: [Footer, MainMenu],

    graphQL: {
        disable: true,
        disablePlaygroundInProduction: true,
    },

    localization: {
        defaultLocale: 'de',
        locales: ['de', 'en'],
    },

    rateLimit: {
        trustProxy: true,
        window: 2 * 60 * 1000, // 2 minutes
        max: 2400, // limit each IP per windowMs
    },

    routes: {
        api: '/api',
        admin: '/admin',
    },

    serverURL: process.env.PAYLOAD_PUBLIC_CMS_URL,

    telemetry: false,

    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },

    plugins: [
        redirects({
            collections: ['pages'],
            overrides: {
                labels: {
                    singular: 'Weiterleitung',
                    plural: 'Weiterleitungen',
                },
                admin: {
                    group: 'Administration',
                    useAsTitle: 'from',
                    defaultColumns: ['from', 'updatedAt'],
                    description: 'Änderungen an den Redirects werden erst nach einem Neustart des Frontends sichtbar.',
                },
            },
        }),
        nestedPages({
            collections: ['pages'],
            generateLabel: (_, doc) => doc.title as string,
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
        }),
    ],
});

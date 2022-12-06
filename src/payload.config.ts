import path from 'path';
import { buildConfig } from 'payload/config';
import CorporateBodies from './collections/CorporateBodies';
import Media from './collections/Media';
import News from './collections/News';
import ApiUsers from './collections/Users/ApiUsers';
import Users from './collections/Users/Users';
import BeforeDashboard from './components/BeforeDashboard';
import BeforeLogin from './components/BeforeLogin';

export default buildConfig({
    serverURL: 'http://localhost:3000',

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
        // Authentication
        Users,
        ApiUsers,

        // Administration
        CorporateBodies,

        // Other
        News,
        Media,
    ],

    // globals are a single-instance collection, often used for navigation or site settings that live in one place
    globals: [

    ],

    localization: {
        locales: ['de', 'en'],
        defaultLocale: 'de',
    },

    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },

    graphQL: {
        disable: true,
    },

    // rateLimits provide basic API DDOS (Denial-of-service) protection and can limit accidental server load from scripts
    rateLimit: {
        trustProxy: true,
        window: 2 * 60 * 1000, // 2 minutes
        max: 2400, // limit each IP per windowMs
    },

    routes: {
        api: '/api',
        admin: '/admin',
    },
});

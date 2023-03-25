import path from 'path';
import * as process from 'process';
import { buildConfig } from 'payload/config';
import Media from './collections/Media';
import ApiUsers from './collections/Users/ApiUsers';
import Users from './collections/Users/Users';
import BeforeDashboard from './components/BeforeDashboard';
import BeforeLogin from './components/BeforeLogin';
import { Footer } from './globals/Footer';

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
        // Authentication
        Users,
        ApiUsers,

        // Other
        Media,
    ],

    // globals are a single-instance collection, often used for navigation or site settings that live in one place
    globals: [Footer],

    graphQL: {
        disable: true,
        disablePlaygroundInProduction: true,
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

    // rateLimits provide basic API DDOS (Denial-of-service) protection and can limit accidental server load from scripts
    serverURL: process.env.PAYLOAD_PUBLIC_CMS_URL,

    telemetry: false,

    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
});

import path from 'path';
import { buildConfig } from 'payload/config';
import ApiUsers from './collections/Users/ApiUsers';
import CorporateBodies from './collections/CorporateBodies';
import News from './collections/News';
import Users from './collections/Users/Users';
import ContactData from './globals/ContactData';

export default buildConfig({
    // ToDo: Make this an environment variable.
    serverURL: 'http://localhost:3000',

    admin: {
        user: Users.slug,
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
    ],

    // globals are a single-instance collection, often used for navigation or site settings that live in one place
    globals: [
        ContactData,
    ],

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

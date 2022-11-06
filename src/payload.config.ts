import path from 'path';
import { buildConfig } from 'payload/config';
import Users from './collections/Users';
import ContactData from './globals/ContactData';

export default buildConfig({
    serverURL: 'http://localhost:3000',
    admin: {
        user: Users.slug,
    },
    collections: [
        Users,
    ],
    globals: [
        ContactData,
    ],
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
    graphQL: {
        schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
    },
});

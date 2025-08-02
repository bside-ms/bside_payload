import path from 'path';
import * as process from 'process';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs';
import { redirectsPlugin } from '@payloadcms/plugin-redirects';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { slateEditor } from '@payloadcms/richtext-slate';
import { buildConfig } from 'payload';
import computeBlurhash from 'payload-blurhash-plugin';
import { isAdmin } from './access/isAdmin';
import ContactForms from './collections/Administration/ContactForms';
import NotFoundPages from './collections/Administration/NotFound';
import Circles from './collections/Circles';
import Events from './collections/Events';
import Media from './collections/Media';
import News from './collections/News';
import Organisation from './collections/Organisation';
import Pages from './collections/Pages';
import ApiUsers from './collections/Users/ApiUsers';
import Users from './collections/Users/Users';
import { AboutBside } from './globals/AboutBside';
import { Banner } from './globals/Banner';
import { EventArchive } from './globals/EventArchive';
import { EventPage } from './globals/EventPage';
import { StartPage } from './globals/StartPage';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { authPlugin } from 'payload-auth-plugin';
import { KeyCloakAuthProvider } from 'payload-auth-plugin/providers';
import Accounts from '@/collections/Users/Accounts';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
        importMap: {
            baseDir: path.resolve(dirname),
        },

        components: {
            afterLogin: ['@/components/AfterLogin/index#AdminLogin'],
        },

        user: Users.slug,

        livePreview: {
            breakpoints: [
                {
                    label: 'Mobile',
                    name: 'mobile',
                    width: 375,
                    height: 667,
                },
                {
                    label: 'Tablet',
                    name: 'tablet',
                    width: 768,
                    height: 1024,
                },
                {
                    label: 'Desktop',
                    name: 'desktop',
                    width: 1440,
                    height: 900,
                },
            ],
        },
    },

    secret: process.env.PAYLOAD_SECRET,

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
        News,
        Pages,

        // Automated
        ContactForms,
        NotFoundPages,

        // Authentication
        ApiUsers,
        Accounts,
    ],

    globals: [StartPage, AboutBside, EventPage, EventArchive, Banner],

    db: mongooseAdapter({
        url: process.env.MONGODB_URI,
    }),

    editor: slateEditor({}),

    graphQL: {
        disable: true,
        disablePlaygroundInProduction: true,
    },

    localization: {
        defaultLocale: 'de',
        locales: ['de', 'en'],
        fallback: true,
    },

    // TODO-MIGRATE
    // rateLimit: {
    //     trustProxy: true,
    //     window: 2 * 60 * 1000, // 2 minutes
    //     max: 2400, // limit each IP per windowMs
    // },

    routes: {
        api: '/api',
        admin: '/admin',
    },

    serverURL: process.env.NEXT_PUBLIC_CMS_URL,
    cors: '*',

    telemetry: false,

    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
        declare: false,
    },

    sharp,

    plugins: [
        redirectsPlugin({
            collections: ['pages'],
            overrides: {
                labels: {
                    singular: 'Weiterleitung',
                    plural: 'Weiterleitungen',
                },
                admin: {
                    group: 'Seiten',
                    useAsTitle: 'from',
                    defaultColumns: ['from', 'updatedAt'],
                    description: 'Änderungen an den Redirects werden erst nach einem Neustart des Frontends sichtbar.',
                },
                access: {
                    read: () => true,
                    create: isAdmin,
                    update: isAdmin,
                    delete: isAdmin,
                },
                versions: {
                    drafts: true,
                },
            },
        }),

        nestedDocsPlugin({
            collections: ['pages'],
            generateLabel: (_, doc) => doc.title as string,

            generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
        }),

        seoPlugin({
            collections: ['organisations', 'circles', 'pages'],
            tabbedUI: true,

            // Disabled. We are using auto-generated screenshots.
            // uploadsCollection: 'media',
        }),

        // TODO-MIGRATE
        // addAuthorFields({
        //     excludedCollections: ['users', 'api-users', 'contact-forms', 'not-found-pages'],
        //
        //     createdByLabel: { en: 'Created by', de: 'Erstellt von' },
        //     updatedByLabel: { en: 'Updated by', es: 'Bearbeitet von' },
        // }),

        authPlugin({
            name: 'oidc-auth',
            allowOAuthAutoSignUp: true,
            usersCollectionSlug: Users.slug,
            accountsCollectionSlug: Accounts.slug,
            successRedirectPath: '/admin/collections',
            errorRedirectPath: '/admin/auth/signin',
            providers: [
                KeyCloakAuthProvider({
                    realm: 'bside',
                    domain: 'login.b-side.ms/auth',
                    identifier: 'keycloak',
                    name: 'keycloak',
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                }),
            ],
        }),

        // TODO-MIGRATE
        // oAuthPlugin({
        //     // @ts-expect-error The plugin config is not configured correctly.
        //     clientID: process.env.CLIENT_ID,
        //     clientSecret: process.env.CLIENT_SECRET,
        //     authorizationURL: `${process.env.NEXT_PUBLIC_OAUTH_SERVER}/protocol/openid-connect/auth`,
        //     tokenURL: `${process.env.NEXT_PUBLIC_OAUTH_SERVER}/protocol/openid-connect/token`,
        //     callbackURL: `${process.env.NEXT_PUBLIC_CMS_URL}/oauth2/callback`,
        //     scope: 'openid',
        //     async userinfo(accessToken) {
        //         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        //         const { data: user } = await axios.get(`${process.env.NEXT_PUBLIC_OAUTH_SERVER}/protocol/openid-connect/userinfo`, {
        //             headers: { Authorization: `Bearer ${accessToken}` },
        //         });
        //
        //         return {
        //             // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        //             sub: user.sub as string,
        //             // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        //             email: user.email as string,
        //             roles: 'public',
        //             // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        //             firstName: user.given_name as string,
        //         };
        //     },
        //
        //     subField: {
        //         name: 'sub',
        //     },
        //
        //     components: {
        //         Button: () => OAuthButton(),
        //     },
        // }),

        computeBlurhash({
            collections: ['media'],
            width: 32,
            height: 32,
            componentX: 4,
            componentY: 4,
            mimeTypePattern: 'image/*',
        }),
    ],

    endpoints: [
        {
            path: '/health',
            method: 'get',
            handler: (): Response => Response.json({ status: 'ok' }),
        },
    ],
});

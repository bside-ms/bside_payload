import path from 'path';
import * as process from 'process';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { de } from '@payloadcms/translations/languages/de';
import { en } from '@payloadcms/translations/languages/en';
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs';
import { redirectsPlugin } from '@payloadcms/plugin-redirects';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { slateEditor } from '@payloadcms/richtext-slate';
import { buildConfig } from 'payload';
import axios from 'axios';
import { OAuth2Plugin } from 'payload-oauth2';
import computeBlurhash from 'payload-blurhash-plugin';
import { isAdmin } from '@/access/isAdmin';
import ContactForms from '@/collections/Administration/ContactForms';
import NotFoundPages from '@/collections/Administration/NotFound';
import Circles from '@/collections/Circles';
import Events from '@/collections/Events';
import Media from '@/collections/Media';
import News from '@/collections/News';
import Organisation from '@/collections/Organisation';
import Pages from '@/collections/Pages';
import ApiUsers from '@/collections/Users/ApiUsers';
import Users from '@/collections/Users/Users';
import { AboutBside } from '@/globals/AboutBside';
import { Banner } from '@/globals/Banner';
import { EventArchive } from '@/globals/EventArchive';
import { EventPage } from '@/globals/EventPage';
import { StartPage } from '@/globals/StartPage';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
        importMap: {
            baseDir: path.resolve(dirname),
        },

        components: {
            // Will be shown on login page after login form (except
            // there will be no login form due to our OAuth plugin).
            afterLogin: ['@/components/Login'],
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

    i18n: {
        supportedLanguages: { en, de },
        fallbackLanguage: 'de',
    },

    // Payload v3 does not support rate limiting anymore, I leave this here for documentation reasons ✌️
    // rateLimit: {
    //     trustProxy: true,
    //     window: 2 * 60 * 1000, // 2 minutes
    //     max: 2400, // limit each IP per windowMs
    // },

    routes: {
        api: '/api',
        admin: '/admin',
    },

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
            generateLabel: (_: unknown, doc: { title?: string }) => String(doc.title ?? ''),

            generateURL: (docs: Array<{ slug?: string }>) => docs.reduce<string>((url, doc) => `${url}/${doc.slug ?? ''}`, ''),
        }),

        seoPlugin({
            collections: ['organisations', 'circles', 'pages'],
            tabbedUI: true,

            // Disabled. We are using auto-generated screenshots.
            // uploadsCollection: 'media',
        }),

        OAuth2Plugin({
            enabled: true,
            strategyName: 'keycloak',
            serverURL: process.env.NEXT_PUBLIC_CMS_URL,
            authCollection: Users.slug,
            useEmailAsIdentity: true,
            subFieldName: 'sub',
            providerAuthorizationUrl: `${process.env.NEXT_PUBLIC_OAUTH_SERVER}/protocol/openid-connect/auth`,
            tokenEndpoint: `${process.env.NEXT_PUBLIC_OAUTH_SERVER}/protocol/openid-connect/token`,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            scopes: ['openid', 'profile', 'email'],

            async getUserInfo(accessToken) {
                interface KeycloakUserInfo {
                    sub: string;
                    email: string;
                    email_verified?: boolean;
                    members?: Array<string>;
                    name?: string;
                    preferred_username?: string;
                    given_name?: string;
                    family_name?: string;
                    locale?: string;
                }

                const { data: user } = await axios.get<KeycloakUserInfo>(
                    `${process.env.NEXT_PUBLIC_OAUTH_SERVER}/protocol/openid-connect/userinfo`,
                    {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    },
                );

                return {
                    sub: user.sub,
                    email: user.email,
                    firstName: user.given_name ?? '',
                    lastName: user.family_name ?? '',
                };
            },

            successRedirect: () => '/admin',
            failureRedirect: () => '/admin/auth/signin',
        }),

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

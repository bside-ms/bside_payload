declare namespace NodeJS {
    export interface ProcessEnv {
        TZ: string;

        PAYLOAD_SECRET: string;
        MONGODB_URI: string;

        COOKIE_DOMAIN: string;
        PAYLOAD_PUBLIC_CMS_URL: string;
        PAYLOAD_PUBLIC_SITE_URL: string;

        REVALIDATION_KEY: string;

        CLIENT_ID: string;
        CLIENT_SECRET: string;
        PAYLOAD_PUBLIC_OAUTH_SERVER: string;
    }
}

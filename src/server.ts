import { config as dotenvConfig } from 'dotenv';
import express from 'express';
import payload from 'payload';

dotenvConfig();

const app = express();

// Redirect root to admin panel
app.get('/', (_, res) => {
    res.redirect('/admin');
});

payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: app,
    onInit: () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
});

app.listen(3000);

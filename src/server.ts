import { config as dotenvConfig } from 'dotenv';
import express from 'express';
import payload from 'payload';

dotenvConfig();

const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
    res.redirect('/admin');
});

// Initialize Payload
payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: app,
    onInit: () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
});

// Add your own express routes here

app.listen(3000);

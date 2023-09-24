import * as process from 'process';
import express from 'express';
import payload from 'payload';
import { seed } from './seed';

require('dotenv').config();

const app = express();

const start = async (): Promise<void> => {
    await payload.init({
        secret: process.env.PAYLOAD_SECRET,
        mongoURL: process.env.MONGODB_URI,
        express: app,
        onInit: () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
        },
    });

    if (process.env.PAYLOAD_SEED === 'true') {
        payload.logger.info('Seeding the Database');
        try {
            await seed(payload);
        } catch (error) {
            payload.logger.error(error);
            payload.logger.error('Seeding failed.');
        }
    }

    app.listen(3000, (): void => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        payload.logger.info('Express is now listening for incoming connections on port 3000.');
    });
};

// Redirect root to admin panel
app.get('/', (_, res) => {
    res.redirect('/admin');
});

start();

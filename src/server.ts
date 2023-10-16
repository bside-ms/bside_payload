import * as process from 'process';
import express from 'express';
import payload from 'payload';

require('dotenv').config();

const app = express();

const start = async (): Promise<void> => {
    await payload.init({
        secret: process.env.PAYLOAD_SECRET,
        express: app,
        onInit: () => {
            payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
        },
    });

    app.listen(3000, (): void => {
        payload.logger.info('Express is now listening for incoming connections on port 3000.');
    });
};

// Redirect root to admin panel
app.get('/', (_, res) => {
    res.redirect('/admin');
});

start();

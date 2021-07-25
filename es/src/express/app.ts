import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import sendLog from '../logger';
import route from './route';
import config from '../config/index';
import { errorMiddleware } from './error';

require('dotenv').config();

const { port } = config.server || 7080;

export default () => {
    const app = express();

    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(logger('dev'));

    app.use('/api', route);

    app.use(errorMiddleware);

    app.listen(port, () => {
        sendLog('info', `listening at http://localhost:${port}`, true);
    });
};

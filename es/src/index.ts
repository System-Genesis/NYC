import initializeMongo from './mongo/initializeMongo';
import initializeExpress from './express/app';
import initializeRabbit from './rabbit';
import { initializeSchedule } from './initializeSchedule';
import sendLog from './logger';

const main = async () => {
    await initializeMongo();

    await initializeRabbit();

    initializeSchedule();

    initializeExpress();
};

main().catch((err) =>
    sendLog('error', 'Unknown error', {
        msg: err.message,
    }),
);

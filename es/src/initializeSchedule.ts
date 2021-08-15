import { DbHandler } from '../../utils/scheduleGetData';
import { getAll } from './express/service';
import updateDB from './mongo/updateDB';
import fieldNames from './config/fieldNames';

// eslint-disable-next-line import/no-mutable-exports
let schedule: DbHandler;

const initializeSchedule = () => {
    schedule = new DbHandler(getAll, updateDB, fieldNames.sources.es);
    schedule.start();
};

export { initializeSchedule, schedule };

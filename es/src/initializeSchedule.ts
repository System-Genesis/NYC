import { DbHandler } from '../../utils/scheduleGetData';
import { getAll } from './express/service';
import updateDB from './mongo/updateDB';
import fieldNames from './config/fieldNames';

let schedule: DbHandler;

const initializeSchedule = () => {
    schedule = new DbHandler(getAll, updateDB, fieldNames.sources.es);
    schedule.start();
}

export { initializeSchedule, schedule };
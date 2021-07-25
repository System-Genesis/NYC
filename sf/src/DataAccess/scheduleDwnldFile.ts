import schedule from 'node-schedule';
import config from '../config/env.config';
import { logInfo } from '../log/logger';

const { hour: defHour, minute: defMinute } = config.schedule;

export class DbHandler {
  hour: number;
  minute: number;
  runFunc: schedule.Job;
  updateData: Function;
  getData: Function;

  constructor(
    updateData: Function,
    getData: Function,
    hour: number = defHour,
    minute: number = defMinute
  ) {
    this.hour = hour;
    this.minute = minute;
    this.updateData = updateData;
    this.getData = getData;
  }

  public async start() {
    logInfo(`Get data for sf run scheduled to ${this.hour}:${this.minute}`);
    this.runFunc = schedule.scheduleJob({ hour: this.hour, minute: this.minute }, async () => {
      logInfo('Get SF DATA is starting');
      const data = await this.getData();
      this.updateData(data);
      // TODO specific log
      logInfo('SF DATA is updated');
    });
  }

  public changeRunTime(hour: number, minute: number) {
    this.runFunc.cancel();
    this.hour = hour;
    this.minute = minute;
    this.start();
  }
}

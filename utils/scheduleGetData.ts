import schedule from 'node-schedule';
import { logInfo } from '../log/logger';

const { HOUR: defHour, MINUTE: defMinute } = process.env;

export class DbHandler {
  hour: number;
  minute: number;
  runFunc: schedule.Job;
  updateData: Function;
  getData: Function;
  source: string;

  constructor(
    updateData: Function,
    getData: Function,
    source: string,
    hour: number = parseInt(defHour as string),
    minute: number = parseInt(defMinute as string),
  ) {
    this.hour = hour;
    this.minute = minute;
    this.updateData = updateData;
    this.getData = getData;
    this.source = source;
    this.start(true);
  }

  private async getAndUpdateDB() {
      logInfo(`Get ${this.source} DATA is starting`, this.source);
      const data = await this.getData();
      this.updateData(data);
      // TODO specific log
      logInfo(`${this.source} DATA is updated`,  this.source);
  }

  public async start(now?: boolean) {
    if (now) { 
      this.getAndUpdateDB();
    }
    logInfo(`Get data for ${this.source} run scheduled to ${this.hour}:${this.minute}`, this.source);
    this.runFunc = schedule.scheduleJob({ hour: this.hour, minute: this.minute }, this.getAndUpdateDB);
  }

  public changeRunTime(hour: number, minute: number) {
    this.runFunc.cancel();
    this.hour = hour;
    this.minute = minute;
    this.start();
  }
}

import daysjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { DateTimeValidationError } from '../error/dateTimeValidationError.js';
import { Validate } from './Validate.js';

export class DateTime {
  public date: Date;

  private constructor(date: Date) {
    daysjs.extend(utc);
    this.date = daysjs(date).utc().toDate();
  }

  static createFromDate(date: Date): DateTime {
    const nullPropResult = Validate.isDate(date, 'date');
    if (!nullPropResult.success)
      throw new DateTimeValidationError(nullPropResult.message!);

    try {
      return new DateTime(date);
    } catch (err: any) {
      throw new DateTimeValidationError(`${err.name} ${err.message}`);
    }
  }

  static createFromString(dateStr: string, timezone?: string): DateTime {
    const date = daysjs(dateStr).toDate();
    return DateTime.createFromDate(date);
  }
  static now(): DateTime {
    return new DateTime(new Date());
  }
  static today(): DateTime {
    const today = daysjs().startOf('day').toDate();
    return new DateTime(today);
  }
  getDate(): Date {
    return this.date;
  }

  getHours() {
    return this.date.getHours();
  }

  greaterThan(d: DateTime): boolean {
    return this.date > d.date;
  }
  greaterThanOrEqual(d: DateTime): boolean {
    return this.date >= d.date;
  }
  lowerThan(d: DateTime): boolean {
    return this.date < d.date;
  }
  lowerThanOrEqual(d: DateTime): boolean {
    return this.date <= d.date;
  }

  dayDiff(d: DateTime): number {
    const d1 = daysjs(this.date).utc().startOf('day');
    const d2 = daysjs(d.date).utc().startOf('day');

    return d1.diff(d2, 'day');
  }

  addDays(days: number): DateTime {
    const date = daysjs(this.date).utc();
    return DateTime.createFromDate(date.add(days, 'day').toDate());
  }
}
const date = DateTime.today();
const date2 = DateTime.createFromString('2022-07-1');

console.log(date.addDays(3));

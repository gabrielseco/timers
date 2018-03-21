import { DateTime } from 'luxon';

export default class LuxonDate {
  constructor(date) {
    this._date = DateTime.fromJSDate(date);
  }

  getDay() {
    return this._date.toLocaleString({ day: 'numeric' });
  }

  getDayOfTheWeek() {
    return this._date.toLocaleString({ weekday: 'long' });
  }

  getMonth() {
    return this._date.toLocaleString({ month: 'long' });
  }

  getYear() {
    return this._date.toLocaleString({ year: 'numeric' });
  }

 }
import { DateTime } from 'luxon';

const BuildDate = date => DateTime.fromJSDate(date);

export default class LuxonDate {
  constructor(date) {
    this._originalDate = date;
    this._date = BuildDate(date);
  }

  getDaysAndTimeRemaing(date) {
    const difference = this._originalDate.getTime() - date.getTime();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
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

  getHours() {
    return this._date.hour;
  }

  getMinutes() {
    return this._date.minute;
  }

  getSeconds() {
    return this._date.second;
  }
}

import LuxonDate from './luxon-date';

describe('LuxonDate', () => {
  const year = 2018;
  const month = 1;
  const day = 28;
  const hour = 10;
  const minutes = 0;
  const seconds = 0;
  const newDate = new Date(year, month, day, hour, minutes, seconds);
  const luxonInstance = new LuxonDate(newDate);

  it('should return the day', () => {
    expect(luxonInstance.getDay()).toBe(day.toString());
  });

  it('should return the days, hours, minutes and seconds from another date', () => {
    const dateBefore = new Date(year, month, 27, 0, 0, 0);
    expect(luxonInstance.getDaysAndTimeRemaing(dateBefore)).toEqual({
      days: 1,
      hours: hour,
      minutes: 0,
      seconds: 0
    });
  });

  it('should get the day of the week', () => {
    expect(luxonInstance.getDayOfTheWeek()).toBe('Wednesday');
  });

  it('should get the month', () => {
    expect(luxonInstance.getMonth()).toBe('February');
  });

  it('should return the year', () => {
    expect(luxonInstance.getYear()).toBe(year.toString());
  });

  it('should get the hour', () => {
    expect(luxonInstance.getHours()).toBe(hour);
  });

  it('should get the minutes', () => {
    expect(luxonInstance.getMinutes()).toBe(minutes);
  });

  it('should get the seconds', () => {
    expect(luxonInstance.getSeconds()).toBe(seconds);
  });
});

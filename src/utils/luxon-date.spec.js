import LuxonDate from './luxon-date';

describe('LuxonDate', () => {
  const newDate = new Date(2018, 1, 28, 0, 0, 0);
  const luxonInstance = new LuxonDate(newDate);
  it('should test', () => {
    expect(true).toBeTruthy();
    expect(luxonInstance).toBeDefined();
  });
});

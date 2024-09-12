import {
  formatDate,
  formatTime,
  formatTimeHours,
  formatTimeColon,
  isSameDate,
} from './formatDate';

const DATE_STRING = '2024-09-11T19:30:00';

describe('formatDate', () => {
  it('should format as `m월 dd일`', () => {
    expect(formatDate(DATE_STRING)).toBe('9월 11일');
  });
});

describe('formatTime', () => {
  it('should format as `HH시 mm분`', () => {
    expect(formatTime(DATE_STRING)).toBe('19시 30분');
  });
});

describe('formatTimeHours', () => {
  it('should format as `HH`', () => {
    expect(formatTimeHours(DATE_STRING)).toBe('19');
  });
});

describe('formatTimeColon', () => {
  it('should format as `HH:mm`', () => {
    expect(formatTimeColon(DATE_STRING)).toBe('19:30');
  });
});

describe('isSameDate', () => {
  it('should return true if the date is the same as today', () => {
    const today = new Date().toISOString();
    expect(isSameDate(today)).toBe(true);
  });

  it('should return false if the date is not the same as today', () => {
    expect(isSameDate(DATE_STRING)).toBe(false);
  });
});

import { formatSecondsToTime, parseStartTimeToQueryString } from './dateTimeUtil';

describe('Date/Time Util', () => {
  describe('formatSecondsToTime()', () => {
    it('returns 0:00 when passed null', () => {
      expect(formatSecondsToTime(null)).toEqual('0:00');
    });

    it('returns 0:00 when passed 0', () => {
      expect(formatSecondsToTime(0)).toEqual('0:00');
    });

    it('returns 0:30 when passed 30', () => {
      expect(formatSecondsToTime(30)).toEqual('0:30');
    });

    it('returns 1:00 when passed 60', () => {
      expect(formatSecondsToTime(60)).toEqual('1:00');
    });

    it('returns 11:45 when passed 705', () => {
      expect(formatSecondsToTime(705)).toEqual('11:45');
    });

    it('returns 3:15:30 when passed 11730', () => {
      expect(formatSecondsToTime(11730)).toEqual('3:15:30');
    });
  });

  describe('parseStartTimeToQueryString()', () => {
    it('returns empty string when passed 0', () => {
      expect(parseStartTimeToQueryString('0')).toEqual('');
    });

    it('returns 1m when passed 60', () => {
      expect(parseStartTimeToQueryString('60')).toEqual('1m');
    });

    it('returns 2m30s when passed 150', () => {
      expect(parseStartTimeToQueryString('150')).toEqual('2m30s');
    });

    it('returns 2m30s when passed 2:30', () => {
      expect(parseStartTimeToQueryString('2:30')).toEqual('2m30s');
    });

    it('returns 45s when passed 0:45', () => {
      expect(parseStartTimeToQueryString('0:45')).toEqual('45s');
    })
  })
});
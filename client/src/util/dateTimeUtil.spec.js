import { formatSecondsToTime } from './dateTimeUtil';

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
});
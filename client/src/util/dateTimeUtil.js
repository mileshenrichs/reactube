/**
 * Formats a number of seconds into a time for display, i.e.:
 * 20 => 0:20, 75 => 1:15, 3650 => 1:00:50
 * @param {Number} seconds number of seconds to convert
 */
const formatSecondsToTime = (seconds) => {
  const SECONDS_IN_HOUR = 3600;
  const SECONDS_IN_MINUTE = 60;
  let secondsRemaining = Math.round(seconds); // seconds left to be converted into hr/min/sec

  // find hours
  const hours = Math.floor(secondsRemaining / SECONDS_IN_HOUR);
  secondsRemaining = secondsRemaining % SECONDS_IN_HOUR;

  // find minutes
  const minutes = Math.floor(secondsRemaining / SECONDS_IN_MINUTE);
  secondsRemaining = secondsRemaining % SECONDS_IN_MINUTE;

  // build and return processed result
  let hoursStr = hours > 0 ? `${hours}:` : '';
  let minutesStr;
  if(minutes > 0) {
    // if no hours, minutes can be returned the way it is
    if(hours === 0) {
      minutesStr = `${minutes}:`;
    } else {
      // if there are hours, make sure minutes is 2 digits
      minutesStr = (minutes < 10 ? '0' : '') + `${minutes}:`;
    }
  } else {
    if(hours === 0) {
      minutesStr = '0:';
    } else {
      minutesStr = '00:';
    }
  }
  let secondsStr = (secondsRemaining < 10 ? '0' : '') + secondsRemaining;

  return hoursStr + minutesStr + secondsStr;
}

/**
 * Converts "start at" time from VideoShareModal into query string to attach to share URL
 * @param {String} startTime video time in format mm:ss or a number of seconds
 * @returns {String} query string in format '1m30s', empty string if invalid startTime
 */
const parseStartTimeToQueryString = (startTime) => {
  const SECONDS_IN_MINUTE = 60;
  let minutes, seconds;

  // handle case: number of seconds provided
  if(!startTime.includes(':')) {
    startTime = parseInt(startTime, 10);
    minutes = Math.floor(startTime / SECONDS_IN_MINUTE);
    seconds = startTime % SECONDS_IN_MINUTE;
  } else {
    // regex to match 1 or two digits, then colon, then two more digits (i.e. 1:30 or 22:00)
    const re = new RegExp('\\d{1,2}:\\d{2}');
    if(re.test(startTime)) {
      minutes = parseInt(startTime.substring(0, startTime.indexOf(':')), 10);
      seconds = parseInt(startTime.substring(startTime.indexOf(':') + 1), 10);
    } else {
      return '';
    }
  }

  return (minutes ? minutes + 'm' : '') + (seconds ? seconds + 's' : '');
}

exports.formatSecondsToTime = formatSecondsToTime;
exports.parseStartTimeToQueryString = parseStartTimeToQueryString;
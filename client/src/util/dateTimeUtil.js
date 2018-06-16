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

  exports.formatSecondsToTime = formatSecondsToTime;
const ffmpeg = require('fluent-ffmpeg');
const { exec } = require('child_process');
const { videoInfo } = require('../util/ffmpeg');
const fs = require('fs');

const getTimemarksFromVideo = (videoPath, cb) => {
  // get video info with ffmpeg command
  exec(videoInfo(videoPath), (error, stdout, stderr) => {
    const ffmpegInfo = stderr;
    const durationMatch = ffmpegInfo.match(/Duration: ((\d\d:){2}\d\d\.\d\d),/);
    const duration = durationMatch[1];
    
    // convert hh:mm:ss.zz to seconds
    const durationNoMilliseconds = duration.substring(0, 8);
    const timeParts = durationNoMilliseconds.split(':');
    const seconds = (+timeParts[0]) * 60 * 60 + (+timeParts[1]) * 60 + (+timeParts[2]); 

    // calculate quarter points of duration (1/4, 1/2, 3/4)
    const q1 = Math.round(seconds * .25);
    const q2 = Math.round(seconds * .5);
    const q3 = Math.round(seconds * .75);

    // invoke callback, passing timemarks as array
    cb([q1, q2, q3]);
  });
}

const extractThumbnails = (screenshotTimemarks, videoPath, videoId) => {
  const timemarks = screenshotTimemarks.filter(mark => mark.toString());

  new ffmpeg(videoPath).screenshots({
    timemarks,
    filename: videoId + '-%s.png',
    folder: './tmp',
    size: '1280x720'
  });
}

const waitForThumbnailsReady = videoId => {
  // continuously check if thumbnail files with given id exist, resolve promise when they do
  return new Promise((resolve, reject) => {
    const fileCheckInterval = setInterval(() => {
      let thumbnailCount = 0;
      fs.readdirSync('./tmp').forEach(file => {
        if(file.includes(videoId + '-')) {
          thumbnailCount++;
        }
      });

      if(thumbnailCount === 3) {
        resolve();
        clearInterval(fileCheckInterval);
      }
    }, 1500);
  });
}

module.exports.extractThumbnails = extractThumbnails;
module.exports.getTimemarksFromVideo = getTimemarksFromVideo;
module.exports.waitForThumbnailsReady = waitForThumbnailsReady;
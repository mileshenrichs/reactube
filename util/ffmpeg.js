const videoInfo = videoPath => 'ffmpeg -i ' + videoPath + ' -f null'

module.exports.videoInfo = videoInfo;
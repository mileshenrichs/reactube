const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ_-abcdefghijklmnopqrstuvwxyz';
const VIDEO_ID_LENGTH = 11;

const generateVideoId = () => {
  let videoId = '';
  for(let i = 0; i < VIDEO_ID_LENGTH; i++) {
    videoId += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
  }
  return videoId;
}

module.exports.generateVideoId = generateVideoId;
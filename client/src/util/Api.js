import axios from 'axios';

export default {

  getNewGeneratedVideoId: () => {
    return axios.get('/api/upload/generate-id');
  },

  uploadVideo: (videoId, videoFile) => {
    let data = new FormData();
    data.append('videoId', videoId);
    data.append('video', videoFile);
    return axios.put('/api/video/upload', data);
  },

  checkUploadProgress: videoId => {
    return axios.get('/api/video/upload-progress?videoId=' + videoId);
  }

}
import axios from 'axios';

export default {

  uploadVideo: videoFile => {
    let data = new FormData();
    data.append('video', videoFile);
    var config = {
      onUploadProgress: function(progressEvent) {
        var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
        console.log(percentCompleted);
      }
    };
    axios.put('/api/video/upload', data, config)
      .then(function (res) {
        console.log('we gucci');
        console.log(res);
      })
      
  }

}
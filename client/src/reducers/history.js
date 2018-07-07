function historyReducer(state = {}, action) {

  switch(action.type) {
    case 'REMOVE_VIDEO_FROM_HISTORY':
      const video = state.watchedVideos.find(video => video.id === action.videoId);
      const videoIndex = state.watchedVideos.indexOf(video);
      return {
        ...state,
        watchedVideos: [
          ...state.watchedVideos.slice(0, videoIndex),
          ...state.watchedVideos.slice(videoIndex + 1)
        ]
      }

    default:
      return state;
  }
}

export default historyReducer;
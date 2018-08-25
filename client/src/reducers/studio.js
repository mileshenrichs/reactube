function studioReducer(state = {}, action) {
  
  switch(action.type) {
    case 'STUDIO_CHANGE_VIDEO_VISIBILITY':
      const video = state.userVideos.find(video => video.id === action.videoId);
      const videoIndex = state.userVideos.indexOf(video);
      return {
        ...state,
        userVideos: [
          ...state.userVideos.slice(0, videoIndex),
          {
            ...state.userVideos[videoIndex],
            visibility: action.newVisibility
          },
          ...state.userVideos.slice(videoIndex + 1)
        ]
      }

    default:
      return state;
  }
}

export default studioReducer;
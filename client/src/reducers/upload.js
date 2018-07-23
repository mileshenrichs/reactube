function uploadReducer(state = {}, action) {

  switch(action.type) {
    case 'CHANGE_UPLOAD_PRIVACY_OPTION':
      return {
        ...state,
        video: {
          ...state.video,
          privacy: action.privacy
        }
      }

    case 'UPLOAD_VIDEO_FILE':
      return {
        ...state,
        video: {
          ...state.video,
          file: action.file
        }
      }
      
    default:
      return state;
  }
}

export default uploadReducer;
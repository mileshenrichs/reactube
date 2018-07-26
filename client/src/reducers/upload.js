function uploadReducer(state = {}, action) {

  switch(action.type) {
    case 'CHANGE_UPLOAD_PRIVACY_OPTION':
      return {
        ...state,
        privacy: action.privacy
      }

    case 'UPLOAD_VIDEO_FILE':
      return {
        ...state,
        file: action.file
      }

    case 'UPLOAD_UPDATE_VIDEO_TITLE':
      return {
        ...state,
        title: action.title
      }

    case 'UPLOAD_UPDATE_VIDEO_DESCRIPTION':
      return {
        ...state,
        description: action.description
      }
      
    default:
      return state;
  }
}

export default uploadReducer;
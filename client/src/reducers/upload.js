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

    case 'UPLOAD_ADD_TAG':
      if(!state.tags.includes(action.tag)) {
        return {
          ...state,
          tags: [
            ...state.tags,
            action.tag
          ]
        }
      } else {
        return state;
      }

    case 'UPLOAD_REMOVE_TAG':
      const tagIndex = state.tags.indexOf(action.tag);
      return {
        ...state,
        tags: [
          ...state.tags.slice(0, tagIndex),
          ...state.tags.slice(tagIndex + 1)
        ]
      }

    case 'SET_PERCENTAGE_UPLOADED':
      return {
        ...state,
        progressPercentage: action.percentageUploaded
      }

    case 'UPLOAD_IS_COMPLETE':
      return {
        ...state,
        uploadComplete: true
      }
      
    default:
      return state;
  }
}

export default uploadReducer;
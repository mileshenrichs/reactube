function subscriptionsReducer(state = {}, action) {

  switch(action.type) {
    case 'SET_VIDEO_LAYOUT':
      return {
        ...state,
        useListLayout: action.showAsList
      }
      
    default:
      return state;
  }
}

export default subscriptionsReducer;
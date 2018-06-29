function notificationReducer(state = {}, action) {

  switch(action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        showNotification: true,
        notificationText: action.notificationText
      };

    case 'CLOSE_NOTIFICATION':
      return {
        ...state,
        showNotification: false,
        notificationText: undefined
      }

    default:
      return state;
  }
}

export default notificationReducer;
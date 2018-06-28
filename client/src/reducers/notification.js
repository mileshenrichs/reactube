function notificationReducer(state = {}, action) {

  switch(action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        showNotification: true,
        notificationText: action.notificationText
      };

    default:
      return state;
  }
}

export default notificationReducer;
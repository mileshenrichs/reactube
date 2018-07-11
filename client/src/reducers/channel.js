export default function channelReducer(state = {}, action) {
  switch(action.type) {

    case 'UPDATE_CHANNEL_USERNAME':
      return {
        ...state,
        username: action.username
      }

    default:
      return state;
  }
}
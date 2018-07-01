function userReducer(state = {}, action) {

  switch(action.type) {
    case 'NEW_PLAYLIST_CREATED':
      return {
        ...state,
        playlists: state.playlists.concat([action.playlist])
      }

    default:
      return state;
  }
}

export default userReducer;
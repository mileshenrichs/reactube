export default function playlistsReducer(state = {}, action) {
  switch(action.type) {

    case 'ADD_VIDEO_TO_PLAYLIST':
      return {
        ...state,
        addToMenu: {
          ...state.addToMenu,
          userPlaylistsContainingVideo: state.addToMenu.userPlaylistsContainingVideo.concat([action.playlistId])
        }
      }

    case 'REMOVE_VIDEO_FROM_PLAYLIST':
      const playlistToRemoveFrom = state.addToMenu.userPlaylistsContainingVideo.find(playlistId => playlistId === action.playlistId);
      if(playlistToRemoveFrom) {
        const playlistIndex = state.addToMenu.userPlaylistsContainingVideo.indexOf(playlistToRemoveFrom);
        return {
          ...state,
          addToMenu: {
            ...state.addToMenu,
            userPlaylistsContainingVideo: state.addToMenu.userPlaylistsContainingVideo.slice(0, playlistIndex)
                                                .concat(state.addToMenu.userPlaylistsContainingVideo.slice(playlistIndex + 1))
          }
        }
      } else {
        return state;
      }

    case 'NEW_PLAYLIST_CREATED':
    return {
      ...state,
      userPlaylists: state.userPlaylists.concat([action.playlist])
    }

    default:
      return state;
  }
}
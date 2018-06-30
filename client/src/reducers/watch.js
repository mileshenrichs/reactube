function watchReducer(state = {}, action) {

  switch(action.type) {
    case 'TOGGLE_DRAWER':
      // prevent body scrolling when drawer open
      document.body.classList.toggle('drawer-open');

      const newShowDrawerState = !state.showLeftDrawer;
      if(newShowDrawerState === false) {
        return Object.assign({}, state, {slideDrawerOut: true});
      } else {
        return Object.assign({}, state, {
          showLeftDrawer: true,
          slideDrawerOut: false
        });
      }

    case 'HIDE_DRAWER_OVERLAY':
      return Object.assign({}, state, {
        showLeftDrawer: false,
        slideDrawerOut: false
      });

    case 'RATE_VIDEO':
      let userRating;
      if(action.liked) {
        userRating = state.userRating === 'LIKE' ? undefined : 'LIKE';
      } else {
        userRating = state.userRating === 'DISLIKE' ? undefined : 'DISLIKE';
      }
      return {
        ...state,
        userRating
      }

    case 'TOGGLE_SHARE_MODAL':
      return {
        ...state,
        showVideoShareModal: !state.showVideoShareModal
      }

    case 'ADD_VIDEO_TO_PLAYLIST':
      return {
        ...state,
        userPlaylistsContainingVideo: state.userPlaylistsContainingVideo.concat([action.playlistId])
      }

    case 'REMOVE_VIDEO_FROM_PLAYLIST':
      const playlistToRemoveFrom = state.userPlaylistsContainingVideo.find(playlistId => playlistId === action.playlistId);
      if(playlistToRemoveFrom) {
        const playlistIndex = state.userPlaylistsContainingVideo.indexOf(playlistToRemoveFrom);
        return {
          ...state,
          userPlaylistsContainingVideo: state.userPlaylistsContainingVideo.slice(0, playlistIndex)
                                              .concat(state.userPlaylistsContainingVideo.slice(playlistIndex + 1))
        }
      } else {
        return state;
      }

    default:
      return state;
  }
}

export default watchReducer;
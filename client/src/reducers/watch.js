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

    default:
      return state;
  }
}

export default watchReducer;
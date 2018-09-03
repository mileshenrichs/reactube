function appReducer(state = {}, action) {

  switch(action.type) {
    case 'TOGGLE_DRAWER':
      // prevent body scrolling when drawer open
      //document.body.classList.toggle('drawer-open');

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

    case 'SET_LEFT_DRAWER_WITHOUT_ANIMATION':
      return {
        ...state,
        showLeftDrawer: action.isShown
      }

    case 'UPDATE_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.newQuery
      }

    case 'SEARCH_PENDING':
      return {
        ...state,
        searchQuery: action.meta.searchQuery
      }

    case 'TOGGLE_ACCOUNT_MENU':
      return {
        ...state,
        showAccountMenu: !state.showAccountMenu
      }
      
    default:
      return state;
  }
}

export default appReducer;
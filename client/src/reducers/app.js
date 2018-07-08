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

    case 'SEARCH_PENDING':
      return {
        ...state,
        searchQuery: action.meta.searchQuery
      }
      
    default:
      return state;
  }
}

export default appReducer;
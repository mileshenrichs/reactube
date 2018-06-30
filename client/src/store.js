import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const defaultState = {
  watch: {
    showLeftDrawer: false,
    slideDrawerOut: false,
    userRating: undefined,
    showVideoShareModal: false,
    userPlaylistsContainingVideo: []
  },
  notification: {
    showNotification: false,
    notificationText: undefined
  }
}

let middleware = [thunk];
if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middleware.push(logger);
}

const store = createStore(rootReducer, defaultState, applyMiddleware(...middleware));

export default store;
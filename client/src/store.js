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
  },
  user: {
    id: 1,
    name: 'Snooz.',
    playlists: [
      {
        id: 'PLA432C0E49DA6710',
        name: 'Watch Later',
        private: true
      },
      {
        id: 'PLA532C0E49DA6710',
        name: 'Algorithms',
        private: true
      },
      {
        id: 'PLA632C0E49DA6710',
        name: 'Favorites',
        private: true
      },
      {
        id: 'PLA432C0D49DA6710',
        name: 'Yum',
        private: false
      },
      {
        id: 'PLA432C0E49DA8710',
        name: 'Reason Tutorials',
        private: false
      },
      {
        id: 'PLAECCC0E491A6710',
        name: 'MW3 Singles',
        private: false
      }
    ]
  }
}

let middleware = [thunk];
if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middleware.push(logger);
}

const store = createStore(rootReducer, defaultState, applyMiddleware(...middleware));

export default store;
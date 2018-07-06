import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const defaultState = {
  app: {
    showLeftDrawer: true,
    slideDrawerOut: false
  },
  watch: {
    watchingVideoId: 'aHlwbm9zaXM',
    videoComments: [],
    userRating: undefined,
    showVideoShareModal: false,
    userPlaylistsContainingVideo: [],
    showAddToMenu: false,
    showExpandedDescription: false,
    sortCommentsByNewest: false,
    userCommentRatings: [
      {
        commentId: 2,
        liked: true
      }
    ]
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
        privacy: 'PRIVATE'
      },
      {
        id: 'PLA532C0E49DA6710',
        name: 'Algorithms',
        privacy: 'UNLISTED'
      },
      {
        id: 'PLA632C0E49DA6710',
        name: 'Favorites',
        privacy: 'PRIVATE'
      },
      {
        id: 'PLA432C0D49DA6710',
        name: 'Yum',
        privacy: 'PUBLIC'
      },
      {
        id: 'PLA432C0E49DA8710',
        name: 'Reason Tutorials',
        privacy: 'PUBLIC'
      },
      {
        id: 'PLAECCC0E491A6710',
        name: 'MW3 Singles',
        privacy: 'PUBLIC'
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
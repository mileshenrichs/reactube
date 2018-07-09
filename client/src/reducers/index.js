import { combineReducers } from 'redux';
import watch from './watch';
import history from './history';
import notification from './notification';
import user from './user';
import app from './app';
import search from './search';
import playlists from './playlists';

const rootReducer = combineReducers({app, search, watch, history, playlists, notification, user});

export default rootReducer;
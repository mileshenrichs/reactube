import { combineReducers } from 'redux';
import watch from './watch';
import history from './history';
import notification from './notification';
import user from './user';
import app from './app';
import search from './search';
import playlists from './playlists';
import channel from './channel';
import subscriptions from './subscriptions';
import upload from './upload';

const rootReducer = combineReducers({app, search, watch, subscriptions, history, channel, upload, playlists, notification, user});

export default rootReducer;
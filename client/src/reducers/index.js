import { combineReducers } from 'redux';
import watch from './watch';
import notification from './notification';
import user from './user';
import app from './app';

const rootReducer = combineReducers({app, watch, notification, user});

export default rootReducer;
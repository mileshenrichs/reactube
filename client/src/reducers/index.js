import { combineReducers } from 'redux';
import watch from './watch';
import history from './history';
import notification from './notification';
import user from './user';
import app from './app';

const rootReducer = combineReducers({app, watch, history, notification, user});

export default rootReducer;
import { combineReducers } from 'redux';
import watch from './watch';
import notification from './notification';
import user from './user';

const rootReducer = combineReducers({watch, notification, user});

export default rootReducer;
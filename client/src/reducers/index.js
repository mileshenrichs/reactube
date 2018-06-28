import { combineReducers } from 'redux';
import watch from './watch';
import notification from './notification';

const rootReducer = combineReducers({watch, notification});

export default rootReducer;
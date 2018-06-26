import { createStore } from 'redux';
import rootReducer from './reducers';

const defaultState = {
  watch: {
    showLeftDrawer: false,
    slideDrawerOut: false
  }
}

const store = createStore(rootReducer, defaultState);

export default store;
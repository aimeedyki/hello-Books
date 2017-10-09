import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import rootReducer from '../reducers';

const ConfigureStore = initialState => createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(reduxThunk),
    window.devToolsExtension ? window.devToolsExtension() : r => r
  )
);

export default ConfigureStore;

import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import reduxThunk from 'redux-thunk';

// export default function configureStore() {
//   return createStore(
//     rootReducer,
//     compose(
//       applyMiddleware(reduxThunk),
//       window.devToolsExtension ? window.devToolsExtension() : r => r
//     )
//   );
// }

const ConfigureStore = initialState => createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(reduxThunk),
    window.devToolsExtension ? window.devToolsExtension() : r => r
  )
);

export default ConfigureStore;

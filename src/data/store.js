import { createStore, applyMiddleware, compose } from 'redux';
// import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
// import rootSaga from './sagas';

export default function configureStore() {
  let store = '';
  console.log('call redux configureStore');
  if (typeof window !== 'undefined') {
    // https://github.com/zalmoxisus/redux-devtools-extension
    store = createStore(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  } else {
    store = createStore(rootReducer);
  }
  return store;
}


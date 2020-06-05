import { createStore, applyMiddleware, compose } from 'redux';
// import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
// import rootSaga from './sagas';

export default function configureStore() {
  // https://github.com/zalmoxisus/redux-devtools-extension
  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
}

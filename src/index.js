import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import routes from './routes';
import App from './components/app';
import rootReducer from './reducers';

import es6Promise from 'es6-promise';

if (typeof window.Promise == "undefined") {
  es6Promise.polyfill();
}

const storeWithPromise = applyMiddleware(promiseMiddleware())(createStore);
const store = storeWithPromise(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function fireTracking() {

}

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={fireTracking} history={history} routes={routes} />
  </Provider>
  , document.querySelector('.container'));

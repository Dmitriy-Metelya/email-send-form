import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import EmailTrackingApp from './components/EmailTrackingApp.jsx';
import reducers from './reducers/index.js';
import thunk from 'redux-thunk';

const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    //devtoolMiddleware,
  ),
);

render(
  <Provider store={store}>
    <EmailTrackingApp />
  </Provider>,
  document.getElementById('container'),
);
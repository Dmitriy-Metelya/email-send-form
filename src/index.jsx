import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Form from './components/Form.jsx';
import reducers from './reducers/index.js';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

render(
  <Provider store={store}>
    <Form />
  </Provider>,
  document.getElementById('container'),
);
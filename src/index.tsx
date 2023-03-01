import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
import './index.css';
import cartReducer from './state/reducers/cartReducer';

// @ts-ignore
const store = createStore(cartReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


// TODO: Remove ts-ingnore and complete readme
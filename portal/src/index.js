import './index.css';

import { Provider } from 'react-redux';
import React from 'react';
import Routes from './routes';
import { render } from 'react-dom';
import store from './store';

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);

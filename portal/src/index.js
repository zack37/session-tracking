import './index.css';
import 'typeface-roboto';

import { Provider } from 'react-redux';
import React from 'react';
import Routes from './routes';
import createStore from './create-store';
import { render } from 'react-dom';

const store = createStore();

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);

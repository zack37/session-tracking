import { applyMiddleware, createStore } from 'redux';

import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';

const middleware = [ thunkMiddleware ];

if(process.env.NODE_ENV === 'development') {
  const loggerMiddleware = createLogger({
    duration: true,
    timestamp: true,
  });
  middleware.push(loggerMiddleware);
}

export default function(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middleware)
  );
}

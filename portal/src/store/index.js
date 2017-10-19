import { applyMiddleware, createStore } from 'redux';

import epics from '../epics';
import logger from 'redux-logger';
import reducers from '../reducers';

const lane = process.env.NODE_ENV;
const middleware = [epics];

if(!!lane || /dev(elopment)?/.test(lane)) {
  middleware.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middleware));

export default store;

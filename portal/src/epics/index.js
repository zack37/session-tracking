import * as clientEpics from './clients';
import * as paymentEpics from './payments';
import * as sessionEpics from './sessions';

import { combineEpics } from 'redux-observable';

const epics = [
  ...Object.values(clientEpics),
  ...Object.values(paymentEpics),
  ...Object.values(sessionEpics),
];

export default combineEpics(...epics);

import clients from './clients';
import { combineReducers } from 'redux';
import payments from './payments';
import sessions from './sessions';

const rootReducer = combineReducers({
  clients,
  sessions,
  payments,
});

export default rootReducer;

import {
  ADD_SESSION,
  CANCEL_ADD_SESSION,
  SESSIONS_REQUEST,
  SESSIONS_RESPONSE,
  SESSION_ADDED,
} from '../actions/sessions';
import { List, Map } from 'immutable';
import reducerFactory from './reducer-factory';

const defaultState = Map({
  isLoading: false,
  isAdding: false,
  sessionsByClient: Map({}),
});

const sessions = reducerFactory(defaultState, {
  [SESSIONS_REQUEST]: state => state.set('isLoading', true),
  [SESSIONS_RESPONSE]: (state, { payload }) =>
    state
      .set('isLoading', false)
      .setIn(['sessionsByClient', payload._id], List(payload.sessionLog)),
  [ADD_SESSION]: state => state.set('isAdding', true),
  [CANCEL_ADD_SESSION]: state => state.set('isAdding', false),
  [SESSION_ADDED]: (state, { payload }) =>
    state.withMutations(state =>
      state
        .set('isAdding', false)
        .updateIn(['sessionsByClient', payload.id], List(), sessions =>
          sessions.push({ date: payload.date, amount: payload.amount })
        )
    ),
});

export default sessions;

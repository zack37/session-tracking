import {
  ADD_SESSION,
  CANCEL_ADD_SESSION,
  SESSIONS_REQUEST,
  SESSIONS_RESPONSE,
  SESSION_ADDED,
} from '../actions/sessions';
import reducerFactory from './reducer-factory';

const defaultState = {
  isLoading: false,
  isAdding: false,
  sessionsByClient: {},
};

const sessions = reducerFactory(defaultState, {
  [SESSIONS_REQUEST]: state => ({ ...state, isLoading: true }),
  [SESSIONS_RESPONSE]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    sessionsByClient: {
      ...state.sessionsByClient,
      ...(payload ? { [payload._id]: payload.sessionLog } : {}),
    },
  }),
  [ADD_SESSION]: state => ({ ...state, isAdding: true }),
  [CANCEL_ADD_SESSION]: state => ({ ...state, isAdding: false }),
  [SESSION_ADDED]: (state, { payload }) => ({
    ...state,
    isAdding: false,
    sessionsByClient: {
      ...state.sessionsByClient,
      [payload.id]: [
        ...state.sessionsByClient[payload.id],
        { date: payload.date, amount: payload.amount },
      ],
    },
  }),
});

export default sessions;

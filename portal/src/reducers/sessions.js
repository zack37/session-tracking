import {
  ADD_SESSION,
  CANCEL_ADD_SESSION,
  SESSIONS_REQUEST,
  SESSIONS_RESPONSE,
  SESSION_ADDED,
} from '../actions/sessions';

const defaultState = {
  isLoading: false,
  isAdding: false,
  sessionsByClient: {},
};

function sessions(state = defaultState, { type, payload }) {
  switch (type) {
    case SESSIONS_REQUEST:
      return { ...state, isLoading: true };
    case SESSIONS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        sessionsByClient: {
          ...state.sessionsByClient,
          ...(payload ? { [payload._id]: payload.sessionLog } : {}),
        },
      };
    case ADD_SESSION:
      return { ...state, isAdding: true };
    case CANCEL_ADD_SESSION:
      return { ...state, isAdding: false };
    case SESSION_ADDED:
      return {
        ...state,
        isAdding: false,
        sessionsByClient: {
          ...state.sessionsByClient,
          [payload.id]: [
            ...state.sessionsByClient[payload.id],
            { date: payload.date, amount: payload.amount },
          ],
        },
      };
    default:
      return state;
  }
}

export default sessions;

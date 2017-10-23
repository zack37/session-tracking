import { SESSIONS_REQUEST, SESSIONS_RESPONSE } from '../actions/sessions';

const defaultState = {
  isLoading: false,
  sessionsByClient: {},
};

function sessions(state = defaultState, action) {
  switch (action.type) {
    case SESSIONS_REQUEST:
      return { ...state, isLoading: true };
    case SESSIONS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        sessionsByClient: {
          ...state.sessionsByClient,
          ...(action.payload
            ? { [action.payload._id]: action.payload.sessionLog }
            : {}),
        },
      };
    default:
      return state;
  }
}

export default sessions;

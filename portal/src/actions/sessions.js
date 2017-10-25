import config from '../config';
import createApi from '../api';

const api = createApi(config.api.url);

export const SESSIONS_REQUEST = 'SESSIONS_REQUEST';
export const SESSIONS_RESPONSE = 'SESSIONS_RESPONSE';
export const ADD_SESSION = 'ADD_SESSION';
export const CANCEL_ADD_SESSION = 'CANCEL_ADD_SESSION';
export const SESSION_ADDED = 'SESSION_ADDED';

const requestSessions = () => ({
  type: SESSIONS_REQUEST,
});

const receiveSessions = () => sessions => ({
  type: SESSIONS_RESPONSE,
  payload: sessions,
});

const sessionAdded = (id, session) => ({
  type: SESSION_ADDED,
  payload: { id, ...session }
});

export const addSession = () => ({
  type: ADD_SESSION,
});

export const cancelSession = () => ({
  type: CANCEL_ADD_SESSION,
});

export const createSession = session => (dispatch, getState) => {
  const id = getState().clients.selectedClient._id;

  return api.post(`/clients/${id}/sessions`, session)
    .mapTo(sessionAdded(id, session))
    .subscribe(dispatch);
};

function shouldGetSessions(state, id) {
  const sessions = state.sessions.sessionsByClient;

  return !sessions || !sessions[id];
}

export const getSessions = id => (dispatch, getState) => {
  if (shouldGetSessions(getState(), id)) {
    dispatch(requestSessions());
    return api
      .get(`/clients/${id}/sessions`)
      .map(receiveSessions())
      .subscribe(dispatch);
  }
};

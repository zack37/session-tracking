import config from '../config';
import createApi from '../api';

const api = createApi(config.api.url);

export const SESSIONS_REQUEST = 'SESSIONS_REQUEST';
export const SESSIONS_RESPONSE = 'SESSIONS_RESPONSE';

const requestSessions = () => ({
  type: SESSIONS_REQUEST,
});

const receiveSessions = () => sessions => ({
  type: SESSIONS_RESPONSE,
  payload: sessions,
});

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

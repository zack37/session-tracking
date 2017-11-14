export const SESSIONS_REQUEST = 'SESSIONS_REQUEST';
export const SESSIONS_RESPONSE = 'SESSIONS_RESPONSE';
export const ADD_SESSION = 'ADD_SESSION';
export const CANCEL_ADD_SESSION = 'CANCEL_ADD_SESSION';
export const SESSION_ADDED = 'SESSION_ADDED';
export const PENDING_SESSIONS_REQUEST = 'PENDING_SESSIONS_REQUEST';
export const CREATE_SESSION = 'CREATE_SESSION';

export const requestSessions = () => ({
  type: SESSIONS_REQUEST,
});

export const receiveSessions = () => sessions => ({
  type: SESSIONS_RESPONSE,
  payload: sessions,
});

export const sessionAdded = (id, session) => ({
  type: SESSION_ADDED,
  payload: { id, ...session }
});

export const addSession = () => ({
  type: ADD_SESSION,
});

export const cancelSession = () => ({
  type: CANCEL_ADD_SESSION,
});

export const createSession = session => ({
  type: CREATE_SESSION,
  payload: session
});

export const getSessions = id => ({
  type: PENDING_SESSIONS_REQUEST,
  payload: { id },
});

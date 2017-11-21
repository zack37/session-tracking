export const CLIENTS_REQUEST = 'CLIENTS_REQUEST';
export const CLIENTS_RESPONSE = 'CLIENTS_RESPONSE';
export const CREATE_CLIENT = 'CREATE_CLIENT';
export const ADD_CLIENT = 'ADD_CLIENT';
export const CANCEL_ADD_CLIENT = 'CANCEL_ADD_CLIENT';
export const CLIENT_ADDED = 'CLIENT_ADDED';
export const CLIENT_SELECTED = 'CLIENT_SELECTED';
export const ADD_BALANCE = 'ADD_BALANCE';
export const SUBTRACT_BALANCE = 'SUBTRACT_BALANCE';
export const SEARCH_CLIENTS = 'SEARCH_CLIENTS';

const requestClients = () => ({
  type: CLIENTS_REQUEST,
});

export const receiveClients = () => clients => ({
  type: CLIENTS_RESPONSE,
  payload: clients,
});

export const clientAdded = () => client => ({
  type: CLIENT_ADDED,
  payload: client,
});

export const getClients = () => {
  return requestClients();
};

export const addClient = () => ({
  type: ADD_CLIENT,
});

export const cancelAddClient = () => ({
  type: CANCEL_ADD_CLIENT,
});

export const createClient = client => ({
  type: CREATE_CLIENT,
  payload: client,
});

export const addBalance = amount => ({
  type: ADD_BALANCE,
  payload: { amount },
});

export const subtractBalance = amount => ({
  type: SUBTRACT_BALANCE,
  payload: { amount },
});

export const selectClient = client => ({
  type: CLIENT_SELECTED,
  payload: client,
});

export const searchClients = searchTerm => ({
  type: SEARCH_CLIENTS,
  payload: { searchTerm }
});

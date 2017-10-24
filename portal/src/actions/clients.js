import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/do';

import config from '../config';
import createApi from '../api';

const api = createApi(config.api.url);

export const CLIENTS_REQUEST = 'CLIENTS_REQUEST';
export const CLIENTS_RESPONSE = 'CLIENTS_RESPONSE';
export const ADD_CLIENT = 'ADD_CLIENT';
export const CLIENT_ADDED = 'CLIENT_ADDED';
export const CLIENT_SELECTED = 'CLIENT_SELECTED';

const requestClients = () => ({
  type: CLIENTS_REQUEST,
});

const receiveClients = () => clients => ({
  type: CLIENTS_RESPONSE,
  payload: clients,
});

const clientAdded = () => client => ({
  type: CLIENT_ADDED,
  payload: client,
});

const fetchClients = () => dispatch => {
  dispatch(requestClients());
  return api
    .get('/clients')
    .map(receiveClients())
    .subscribe(dispatch);
};

export const getClients = () => dispatch => {
  return dispatch(fetchClients());
};

export const addClient = () => ({
  type: ADD_CLIENT,
});

export const createClient = client => dispatch => {
  return api
    .post('/clients', client)
    .map(clientAdded())
    .subscribe(dispatch);
};

export const selectClient = client => ({
  type: CLIENT_SELECTED,
  payload: client,
});

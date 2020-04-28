import {
  ADD_BALANCE,
  ADD_CLIENT,
  CANCEL_ADD_CLIENT,
  CLIENTS_REQUEST,
  CLIENTS_RESPONSE,
  CLIENT_ADDED,
  CLIENT_SELECTED,
  SEARCH_CLIENTS,
  SUBTRACT_BALANCE,
} from '../actions/clients';

import { Map, List } from 'immutable';
import fuzzysearch from 'fuzzysearch';
import reducerFactory from './reducer-factory';

const defaultState = Map({
  clients: List(),
  filteredClients: null,
  isLoading: false,
  isAdding: false,
  selectedClient: null,
});

const searchClientName = (clients, searchTerm) => {
  return clients.filter(x =>
    fuzzysearch(searchTerm, x.get('name').toLowerCase())
  );
};

const clients = reducerFactory(defaultState, {
  [ADD_CLIENT]: state => state.merge({ isAdding: true, selectedClient: null }),
  [CANCEL_ADD_CLIENT]: state => state.set('isAdding', false),
  [CLIENT_ADDED]: (state, { payload }) =>
    state.merge({
      isAdding: false,
      clients: state.get('clients').concat(payload),
    }),
  [CLIENTS_REQUEST]: state => state.set('isLoading', true),
  [CLIENTS_RESPONSE]: (state, { payload }) =>
    state.merge({ isLoading: false, clients: List(payload) }),
  [CLIENT_SELECTED]: (state, { payload }) =>
    state.merge({ isAdding: false, selectedClient: Map(payload) }),
  [ADD_BALANCE]: (state, { payload }) =>
    state.updateIn(
      ['selectedClient', 'balance'],
      balance => balance + payload.amount
    ),
  [SUBTRACT_BALANCE]: (state, { payload }) =>
    state.updateIn(
      ['selectedClient', 'balance'],
      balance => balance - payload.amount
    ),
  [SEARCH_CLIENTS]: (state, { payload }) =>
    state.set(
      'filteredClients',
      payload.searchTerm
        ? searchClientName(
            state.get('clients'),
            payload.searchTerm.toLowerCase()
          )
        : null
    ),
});

export default clients;

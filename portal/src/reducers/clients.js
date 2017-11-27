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

import fuzzysearch from 'fuzzysearch';
import reducerFactory from './reducer-factory';
import { filter } from 'ramda';

const defaultState = {
  clients: [],
  filteredClients: null,
  isLoading: false,
  isAdding: false,
  selectedClient: null,
};

const searchClientName = (clients, searchTerm) => {
  return filter(x => fuzzysearch(searchTerm, x.name.toLowerCase()), clients);
};

const clients = reducerFactory(defaultState, {
  [ADD_CLIENT]: state => ({ ...state, isAdding: true, selectedClient: null }),
  [CANCEL_ADD_CLIENT]: state => ({ ...state, isAdding: false }),
  [CLIENT_ADDED]: (state, { payload }) => ({
    ...state,
    isAdding: false,
    clients: [...state.clients, payload],
  }),
  [CLIENTS_REQUEST]: state => ({ ...state, isLoading: true }),
  [CLIENTS_RESPONSE]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    clients: payload,
  }),
  [CLIENT_SELECTED]: (state, { payload }) => ({
    ...state,
    isAdding: false,
    selectedClient: payload,
  }),
  [ADD_BALANCE]: (state, { payload }) => ({
    ...state,
    selectedClient: {
      ...state.selectedClient,
      balance: state.selectedClient.balance + payload.amount,
    },
  }),
  [SUBTRACT_BALANCE]: (state, { payload }) => ({
    ...state,
    selectedClient: {
      ...state.selectedClient,
      balance: state.selectedClient.balance - payload.amount,
    },
  }),
  [SEARCH_CLIENTS]: (state, { payload }) => ({
    ...state,
    filteredClients: payload.searchTerm
      ? searchClientName(state.clients, payload.searchTerm.toLowerCase())
      : null,
  }),
});

export default clients;

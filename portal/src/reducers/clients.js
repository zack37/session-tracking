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

const defaultState = {
  clients: [],
  filteredClients: null,
  isLoading: false,
  isAdding: false,
  selectedClient: null,
};

function clients(state = defaultState, { type, payload }) {
  switch (type) {
    case ADD_CLIENT:
      return { ...state, isAdding: true, selectedClient: null };
    case CANCEL_ADD_CLIENT:
      return { ...state, isAdding: false };
    case CLIENT_ADDED:
      return {
        ...state,
        isAdding: false,
        clients: [...state.clients, payload],
      };
    case CLIENTS_REQUEST:
      return { ...state, isLoading: true };
    case CLIENTS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        clients: payload,
      };
    case CLIENT_SELECTED:
      return { ...state, isAdding: false, selectedClient: payload };
    case ADD_BALANCE:
      return {
        ...state,
        selectedClient: {
          ...state.selectedClient,
          balance: state.selectedClient.balance + payload.amount,
        },
      };
    case SUBTRACT_BALANCE:
      return {
        ...state,
        selectedClient: {
          ...state.selectedClient,
          balance: state.selectedClient.balance - payload.amount,
        },
      };
    case SEARCH_CLIENTS:
      return {
        ...state,
        filteredClients: payload.searchTerm
          ? state.clients.filter(x =>
              fuzzysearch(payload.searchTerm, x.name.toLowerCase())
            )
          : null,
      };
    default:
      return state;
  }
}

export default clients;

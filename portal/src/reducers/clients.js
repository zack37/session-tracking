import {
  ADD_CLIENT,
  CLIENTS_REQUEST,
  CLIENTS_RESPONSE,
  CLIENT_ADDED,
  CLIENT_SELECTED,
} from '../actions/clients';

const defaultState = {
  clients: [],
  isLoading: false,
  isAdding: false,
  selectedClient: null,
};

function clients(state = defaultState, { type, payload }) {
  switch (type) {
    case ADD_CLIENT:
      return { ...state, isAdding: true, selectedClient: null };
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
    default:
      return state;
  }
}

export default clients;

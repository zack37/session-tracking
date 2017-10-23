import {
  CLIENTS_REQUEST,
  CLIENTS_RESPONSE,
  CLIENT_ADDED,
  CLIENT_SELECTED,
} from '../actions/clients';

const defaultState = {
  clients: [],
  isLoading: false,
  selectedClient: null
};

function clients(state = defaultState, action) {
  switch (action.type) {
    case CLIENT_ADDED:
      return { ...state, clients: [...state.clients, action.payload] };
    case CLIENTS_REQUEST:
      return { ...state, isLoading: true };
    case CLIENTS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        clients: action.payload,
      };
    case CLIENT_SELECTED:
      return { ...state, selectedClient: action.payload };
    default:
      return state;
  }
}

export default clients;

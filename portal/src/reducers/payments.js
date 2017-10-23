import { PAYMENTS_REQUEST, PAYMENTS_RESPONSE } from '../actions/payments';

const defaultState = {
  isLoading: false,
  paymentsByClient: {},
};

function payments(state = defaultState, action) {
  switch (action.type) {
    case PAYMENTS_REQUEST:
      return { ...state, isLoading: true };
    case PAYMENTS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        paymentsByClient: {
          ...state.paymentsByClient,
          ...(action.payload
            ? { [action.payload._id]: action.payload.paymentLog }
            : {}),
        },
      };
    default:
      return state;
  }
}

export default payments;

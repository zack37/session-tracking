import {
  ADD_PAYMENT,
  CANCEL_ADD_PAYMENT,
  PAYMENTS_REQUEST,
  PAYMENTS_RESPONSE,
  PAYMENT_ADDED,
} from '../actions/payments';

const defaultState = {
  isLoading: false,
  isAdding: false,
  paymentsByClient: {},
};

function payments(state = defaultState, { type, payload }) {
  switch (type) {
    case PAYMENTS_REQUEST:
      return { ...state, isLoading: true };
    case PAYMENTS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        paymentsByClient: {
          ...state.paymentsByClient,
          ...(payload ? { [payload._id]: payload.paymentLog } : {}),
        },
      };
    case ADD_PAYMENT:
      return { ...state, isAdding: true };
    case CANCEL_ADD_PAYMENT:
      return { ...state, isAdding: false };
    case PAYMENT_ADDED:
      return {
        ...state,
        isAdding: false,
        paymentsByClient: {
          ...state.paymentsByClient,
          [payload.id]: [
            ...state.paymentsByClient[payload.id],
            { date: payload.date, amount: payload.amount },
          ],
        },
      };
    default:
      return state;
  }
}

export default payments;

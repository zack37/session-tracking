import {
  ADD_PAYMENT,
  CANCEL_ADD_PAYMENT,
  PAYMENTS_REQUEST,
  PAYMENTS_RESPONSE,
  PAYMENT_ADDED,
} from '../actions/payments';
import reducerFactory from './reducer-factory';

const defaultState = {
  isLoading: false,
  isAdding: false,
  paymentsByClient: {},
};

const payments = reducerFactory(defaultState, {
  [PAYMENTS_REQUEST]: state => ({ ...state, isLoading: true }),
  [PAYMENTS_RESPONSE]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    paymentsByClient: {
      ...state.paymentsByClient,
      ...(payload ? { [payload._id]: payload.paymentLog } : {}),
    },
  }),
  [ADD_PAYMENT]: state => ({ ...state, isAdding: true }),
  [CANCEL_ADD_PAYMENT]: state => ({ ...state, isAdding: false }),
  [PAYMENT_ADDED]: (state, { payload }) => ({
    ...state,
    isAdding: false,
    paymentsByClient: {
      ...state.paymentsByClient,
      [payload.id]: [
        ...state.paymentsByClient[payload.id],
        { date: payload.date, amount: payload.amount },
      ],
    },
  }),
});

export default payments;

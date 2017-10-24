import config from '../config';
import createApi from '../api';

const api = createApi(config.api.url);

export const PAYMENTS_REQUEST = 'PAYMENTS_REQUEST';
export const PAYMENTS_RESPONSE = 'PAYMENTS_RESPONSE';
// export const LOG_PAYMENT = 'LOG_PAYMENT';
export const LOGGED_PAYMENT = 'LOGGED_PAYMENT';
export const ADD_PAYMENT = 'ADD_PAYMENT';
export const CANCEL_ADD_PAYMENT = 'CANCEL_ADD_PAYMENT';
export const PAYMENT_ADDED = 'PAYMENT_ADDED';

const requestPayments = () => ({
  type: PAYMENTS_REQUEST,
});

const receivePayments = () => payments => ({
  type: PAYMENTS_RESPONSE,
  payload: payments,
});

const loggedPayment = (id, payment) => ({
  action: LOGGED_PAYMENT,
  payload: { id, ...payment },
});

export const logPayment = (id, payment) => (dispatch) => {
  return api.post(`/clients/${id}/payments`, payment)
    .map(loggedPayment(id, payment))
    .subscrube(dispatch);
};

export const addPayment = () => ({
  type: ADD_PAYMENT,
});

export const cancelPayment = () => ({
  type: CANCEL_ADD_PAYMENT,
});

export const createPayment = payment => ({
  type: PAYMENT_ADDED,
  payload: payment
});

function shouldFetchPayments(state, id) {
  const payments = state.payments.paymentsByClient;

  return !payments || !payments[id];
}

export const getPayments = id => (dispatch, getState) => {
  if (shouldFetchPayments(getState(), id)) {
    dispatch(requestPayments());
    return api
      .get(`/clients/${id}/payments`)
      .map(receivePayments())
      .subscribe(dispatch);
  }
};

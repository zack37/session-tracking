import config from '../config';
import createApi from '../api';

const api = createApi(config.api.url);

export const PAYMENTS_REQUEST = 'PAYMENTS_REQUEST';
export const PAYMENTS_RESPONSE = 'PAYMENTS_RESPONSE';
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

const paymentAdded = (id, payment) => ({
  type: PAYMENT_ADDED,
  payload: { id, ...payment },
});

export const addPayment = () => ({
  type: ADD_PAYMENT,
});

export const cancelPayment = () => ({
  type: CANCEL_ADD_PAYMENT,
});

export const createPayment = payment => (dispatch, getState) => {
  const id = getState().clients.selectedClient._id;

  return api.post(`/clients/${id}/payments`, payment)
    .mapTo(paymentAdded(id, payment))
    .subscribe(dispatch);
};

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

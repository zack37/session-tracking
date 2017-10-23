import config from '../config';
import createApi from '../api';

const api = createApi(config.api.url);

export const PAYMENTS_REQUEST = 'PAYMENTS_REQUEST';
export const PAYMENTS_RESPONSE = 'PAYMENTS_RESPONSE';

const requestPayments = () => ({
  type: PAYMENTS_REQUEST,
});

const receivePayments = () => payments => ({
  type: PAYMENTS_RESPONSE,
  payload: payments,
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

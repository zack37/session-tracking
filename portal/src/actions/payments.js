export const PENDING_PAYMENTS_REQUEST = 'PENDING_PAYMENTS_REQUEST';
export const PAYMENTS_REQUEST = 'PAYMENTS_REQUEST';
export const PAYMENTS_RESPONSE = 'PAYMENTS_RESPONSE';
export const ADD_PAYMENT = 'ADD_PAYMENT';
export const CANCEL_ADD_PAYMENT = 'CANCEL_ADD_PAYMENT';
export const PAYMENT_ADDED = 'PAYMENT_ADDED';
export const CREATE_PAYMENT = 'CREATE_PAYMENT';

export const requestPayments = () => ({
  type: PAYMENTS_REQUEST,
});

export const receivePayments = () => payments => ({
  type: PAYMENTS_RESPONSE,
  payload: payments,
});

export const paymentAdded = (id, payment) => ({
  type: PAYMENT_ADDED,
  payload: { id, ...payment },
});

export const addPayment = () => ({
  type: ADD_PAYMENT,
});

export const cancelPayment = () => ({
  type: CANCEL_ADD_PAYMENT,
});

export const createPayment = payment => ({
  type: CREATE_PAYMENT,
  payload: payment,
});

export const getPayments = id => ({
  type: PENDING_PAYMENTS_REQUEST,
  payload: { id },
});

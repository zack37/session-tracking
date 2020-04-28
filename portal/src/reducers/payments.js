import {
  ADD_PAYMENT,
  CANCEL_ADD_PAYMENT,
  PAYMENTS_REQUEST,
  PAYMENTS_RESPONSE,
  PAYMENT_ADDED,
} from '../actions/payments';

import { List, Map } from 'immutable';
import reducerFactory from './reducer-factory';

const defaultState = Map({
  isLoading: false,
  isAdding: false,
  paymentsByClient: Map({}),
});

const payments = reducerFactory(defaultState, {
  [PAYMENTS_REQUEST]: state => state.set('isLoading', true),
  [PAYMENTS_RESPONSE]: (state, { payload }) =>
    state
      .set('isLoading', false)
      .setIn(['paymentsByClient', payload._id], List(payload.paymentLog)),
  [ADD_PAYMENT]: state => state.set('isAdding', true),
  [CANCEL_ADD_PAYMENT]: state => state.set('isAdding', false),
  [PAYMENT_ADDED]: (state, { payload }) =>
    state
      .set('isAdding', false)
      .updateIn(['paymentsByClient', payload.id], List(), payments =>
        payments.push({ date: payload.date, amount: payload.amount })
      ),
});

export default payments;

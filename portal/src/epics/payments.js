import 'rxjs/add/observable/of';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import {
  CREATE_PAYMENT,
  PENDING_PAYMENTS_REQUEST,
  paymentAdded,
  receivePayments,
  requestPayments,
} from '../actions/payments';

import { Observable } from 'rxjs/Observable';
import { addBalance } from '../actions/clients';
import config from '../config';
import createApi from '../api';

const api = createApi(config.api.url);

export const getPaymentsEpic = (action$, store) => {
  return action$
    .ofType(PENDING_PAYMENTS_REQUEST)
    .filter(action => {
      const payments = store
        .getState()
        .payments.getIn(['paymentsByClient', action.payload.id]);
      return !payments;
    })
    .mergeMap(action => {
      return Observable.of(requestPayments()).concat(
        api.get(`/clients/${action.payload.id}/payments`).map(receivePayments())
      );
    });
};

export const createPaymentEpic = (action$, store) => {
  const id = () => store.getState().clients.getIn(['selectedClient', '_id']);

  return action$
    .ofType(CREATE_PAYMENT)
    .filter(() => !!id())
    .switchMap(action => {
      const payment = action.payload;
      const clientId = id();

      return api.post(`/clients/${clientId}/payments`, payment).mergeMap(() => {
        return Observable.of(
          paymentAdded(clientId, payment),
          addBalance(payment.amount)
        );
      });
    });
};

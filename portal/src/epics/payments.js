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
import { path } from 'ramda';

const api = createApi(config.api.url);

export const getPaymentsEpic = (action$, store) => {
  return action$
    .ofType(PENDING_PAYMENTS_REQUEST)
    .filter(action => {
      const payments = store.getState().payments.paymentsByClient;
      return !payments || !payments[action.payload.id];
    })
    .mergeMap(action => {
      return Observable.of(requestPayments()).concat(
        api.get(`/clients/${action.payload.id}/payments`).map(receivePayments())
      );
    });
};

export const createPaymentEpic = (action$, store) => {
  const id = () => path(['clients', 'selectedClient', '_id'], store.getState());

  return action$
    .ofType(CREATE_PAYMENT)
    .filter(() => !!id())
    .switchMap(action => {
      const payment = action.payload;

      return api.post(`/clients/${id()}/payments`, payment).mergeMap(() => {
        return Observable.of(
          paymentAdded(id(), payment),
          addBalance(payment.amount)
        );
      });
    });
};

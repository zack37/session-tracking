import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import {
  ADD_CLIENT,
  CLIENTS_REQUEST,
  CLIENT_SELECTED,
  CREATE_CLIENT,
  clientAdded,
  receiveClients,
} from '../actions/clients';
import { cancelPayment, getPayments } from '../actions/payments';
import { cancelSession, getSessions } from '../actions/sessions';

import { Observable } from 'rxjs/Observable';
import config from '../config';
import createApi from '../api';

const api = createApi(config.api.url);

export const createClientEpic = action$ => {
  return action$
    .ofType(CREATE_CLIENT)
    .mergeMap(action => {
      return api.post('/clients', action.payload);
    })
    .map(clientAdded());
};

export const getClientsEpic = action$ => {
  return action$
    .ofType(CLIENTS_REQUEST)
    .switchMap(() => api.get('/clients'))
    .map(receiveClients());
};

export const addClientClickedEpic = action$ => {
  return action$.ofType(ADD_CLIENT).mergeMap(() => {
    return Observable.of(cancelPayment(), cancelSession());
  });
};

export const selectClientEpic = action$ => {
  return action$.ofType(CLIENT_SELECTED).mergeMap(action => {
    const id = action.payload._id;
    return Observable.of(
      getSessions(id),
      getPayments(id),
      cancelPayment(),
      cancelSession()
    );
  });
};

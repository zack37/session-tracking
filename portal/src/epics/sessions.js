import 'rxjs/add/observable/of';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import {
  CREATE_SESSION,
  PENDING_SESSIONS_REQUEST,
  receiveSessions,
  requestSessions,
  sessionAdded,
} from '../actions/sessions';

import { Observable } from 'rxjs/Observable';
import config from '../config';
import createApi from '../api';
import { subtractBalance } from '../actions/clients';

const api = createApi(config.api.url);

export const getSessionsEpic = (action$, store) => {
  return action$
    .ofType(PENDING_SESSIONS_REQUEST)
    .filter(action => {
      const sessions = store
        .getState()
        .sessions.getIn(['sessionsByClient', action.payload.id]);
      return !sessions;
    })
    .mergeMap(action => {
      return Observable.of(requestSessions()).concat(
        api.get(`/clients/${action.payload.id}/sessions`).map(receiveSessions())
      );
    });
};

export const createSessionEpic = (action$, store) => {
  const id = () => store.getState().clients.getIn(['selectedClient', '_id']);

  return action$
    .ofType(CREATE_SESSION)
    .filter(() => !!id())
    .mergeMap(action => {
      const session = action.payload;
      const clientId = id();

      return api.post(`/clients/${clientId}/sessions`, session).mergeMap(() => {
        return Observable.of(
          sessionAdded(clientId, session),
          subtractBalance(session.amount)
        );
      });
    });
};

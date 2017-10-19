import { combineEpics, createEpicMiddleware } from 'redux-observable';

const epics = [];

export default createEpicMiddleware(combineEpics(...epics));

import {put, takeLatest, call} from 'redux-saga/effects';

import {INITIALIZE_APP, setAppState} from '../reducers/appState';

import {fetchScoreBoard} from '../reducers/scoreBoard';

function* initializeApp() {
  yield put(setAppState('START_INITIALIZE_APP', null, true));
  yield put(fetchScoreBoard());
  yield put(setAppState('SUCCESS_INITIALIZE_APP', null, false));
}

const appStateSagas = [takeLatest(INITIALIZE_APP, initializeApp)];

export default appStateSagas;

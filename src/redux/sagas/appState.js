import {put, takeLatest, call} from 'redux-saga/effects';

import {INITIALIZE_APP, setAppState} from '../reducers/appState';
import {fetchScoreBoard} from '../reducers/scoreBoard';
import reactotron from 'reactotron-react-native';

function* initializeApp() {
  yield put(setAppState('START_INITIALIZE_APP'));

  yield put(fetchScoreBoard());
}

const appStateSagas = [takeLatest(INITIALIZE_APP, initializeApp)];

export default appStateSagas;

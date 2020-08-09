import {all} from 'redux-saga/effects';

import appStateSagas from './appState';
import scoreBoardSagas from './scoreBoard';

export default function* rootSaga() {
  yield all([...appStateSagas, ...scoreBoardSagas]);
}

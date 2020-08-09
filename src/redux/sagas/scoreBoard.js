import {takeLatest, put, call} from 'redux-saga/effects';
import {FETCH_SCORE_BOARD, updateScoreBoard} from '../reducers/scoreBoard';
import {setAppState} from '../reducers/appState';
import {scoreBoardResponse} from '../api/scoreBoardApi';

export function* fetchScoreBoard() {
  yield put(setAppState('START_FETCH_SCORE_BOARD'));
  const scoreBoardData = yield call(scoreBoardResponse);
  yield put(updateScoreBoard(scoreBoardData));
}

const scoreBoardSagas = [takeLatest(FETCH_SCORE_BOARD, fetchScoreBoard)];

export default scoreBoardSagas;

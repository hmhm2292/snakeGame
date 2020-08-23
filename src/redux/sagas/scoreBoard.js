import {takeLatest, put, call} from 'redux-saga/effects';
import {
  FETCH_SCORE_BOARD,
  updateScoreBoard,
  POST_NEW_SCORE,
} from '../reducers/scoreBoard';
import {setAppState} from '../reducers/appState';
import {fetchScore, uploadScore} from '../api/scoreBoardApi';
import reactotron from 'reactotron-react-native';

export function* fetchScoreBoard() {
  reactotron.log('fetch');
  yield put(setAppState('START_FETCH_SCORE_BOARD', null, true));
  const scoreBoardData = yield call(fetchScore);
  yield put(updateScoreBoard(scoreBoardData));
  yield put(setAppState('SUCCESS_FETCH_SCORE_BOARD', null, false));
}

export function* postNewScore(action) {
  reactotron.log(action);
  yield put(setAppState('START_UPDATE_SCORE_BOARD'));
  const response = yield call(uploadScore, action);

  reactotron.log({response});
  if (response.status === 200) {
    yield put(setAppState('SUCCESS_UPDATE_SCORE_BOARD'));
  } else {
    yield put(setAppState('FAILED_UPDATE_SCORE_BOARD'));
  }
}

const scoreBoardSagas = [
  takeLatest(FETCH_SCORE_BOARD, fetchScoreBoard),
  takeLatest(POST_NEW_SCORE, postNewScore),
];

export default scoreBoardSagas;

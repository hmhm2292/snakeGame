import {combineReducers} from 'redux';

import appState from './appState';
import scoreBoard from './scoreBoard';

const rootReducer = combineReducers({
  appState: appState,
  scoreBoard: scoreBoard,
});

export default rootReducer;

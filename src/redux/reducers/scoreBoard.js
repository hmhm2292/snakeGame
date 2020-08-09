export const FETCH_SCORE_BOARD = 'reducers/appState/FETCH_SCORE_BOARD';
export const UPDATE_SCORE_BOARD = 'reducers/appState/UPDATE_SCORE_BOARD';

export const fetchScoreBoard = () => ({
  type: FETCH_SCORE_BOARD,
});

export const updateScoreBoard = scoreData => ({
  type: UPDATE_SCORE_BOARD,
  scoreData: scoreData,
});

const INITIAL_STATE = {
  scoreBoard: [],
};

const scoreBoard = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_SCORE_BOARD:
      return {
        ...state,
        scoreBoard: action.scoreData,
      };

    default:
      return state;
  }
};

export default scoreBoard;

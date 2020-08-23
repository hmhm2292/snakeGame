import reactotron from 'reactotron-react-native';

export const FETCH_SCORE_BOARD = 'reducers/appState/FETCH_SCORE_BOARD';
export const UPDATE_SCORE_BOARD = 'reducers/appState/UPDATE_SCORE_BOARD';
export const POST_NEW_SCORE = 'reducers/appState/POST_NEW_SCORE';

export const fetchScoreBoard = () => ({
  type: FETCH_SCORE_BOARD,
});

export const postNewScore = newScore => ({
  type: POST_NEW_SCORE,
  newScore,
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
      const latestScoreBoard = {
        ...state,
        scoreBoard: state.scoreBoard.concat(action.scoreData),
      };

      const updatedScoreBoard = scoreBoardFactory(
        latestScoreBoard,
      ).latestScore();

      return {
        scoreBoard: updatedScoreBoard,
      };
    default:
      return state;
  }
};

export default scoreBoard;

const scoreBoardFactory = ({scoreBoard}) => {
  const getScore = () => scoreBoard;

  const sortBigToSmall = () => {
    return getScore().sort((a, b) => {
      return b.score - a.score;
    });
  };

  const latestScore = () => {
    if (sortBigToSmall().length <= 10) {
      return sortBigToSmall();
    } else if (sortBigToSmall().length > 10) {
      return sortBigToSmall().slice(0, 10);
    }
  };

  return {latestScore};
};

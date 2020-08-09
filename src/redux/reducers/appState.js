export const INITIALIZE_APP = 'reducers/appState/INITIALIZE_APP';
export const SET_APP_STATE = 'reducers/appState/SET_APP_STATE';

export const setAppState = (state, params, loading) => ({
  type: SET_APP_STATE,
  state,
  params,
  loading,
});

export const initializeApp = () => ({
  type: INITIALIZE_APP,
});

const INITIAL_STATE = {
  appState: 'APP_LAUNCHED',
  params: undefined,
  loading: false,
};

const appState = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_APP_STATE:
      return {
        ...state,
        appState: action.state,
        params: action.params,
        loading: action.loading,
      };

    default:
      return state;
  }
};

export default appState;

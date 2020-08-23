import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import thunk from 'redux-thunk';

import Reactotron from '../../utils/ReactotronConfig';
import reactotron from 'reactotron-react-native';

let sagaMonitor, sagaMiddleware;

if (Reactotron) {
  sagaMonitor = Reactotron.createSagaMonitor();
  sagaMiddleware = createSagaMiddleware({sagaMonitor});
} else {
  sagaMiddleware = createSagaMiddleware();
}

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware, thunk),
    Reactotron.createEnhancer(),
  ),
);

sagaMiddleware.run(rootSaga);

export default store;

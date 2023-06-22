import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';
import rdcQuiz from './Reducers/rdcQuiz';
import saga from 'redux-saga';
import quizSaga from './Saga/quizSaga';
const sagaMiddle = saga();
const state = combineReducers({
  quizManage: rdcQuiz,
});

const store = createStore(state, applyMiddleware(sagaMiddle));
sagaMiddle.run(quizSaga);
export default store;

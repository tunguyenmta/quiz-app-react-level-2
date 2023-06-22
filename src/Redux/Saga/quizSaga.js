import { takeEvery, call, put } from 'redux-saga/effects';
import actQuiz from '../Actions/actQuiz';
async function getTypeFromAPI() {
  let res = await fetch('https://opentdb.com/api_category.php');
  let data = res.json();
  return data;
}

function* getQuizType() {
  let payload = yield call(getTypeFromAPI);
  yield put({ type: actQuiz.SET_QUIZ_TYPE, payload: payload });
}

function* quizSaga() {
  yield takeEvery(actQuiz.GET_QUIZ_TYPE, getQuizType);
}

export default quizSaga;

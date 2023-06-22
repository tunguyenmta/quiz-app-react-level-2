import { takeEvery, call, put } from 'redux-saga/effects';
import actQuiz from '../Actions/actQuiz';

async function getQuizFromAPI(category, difficulty) {
  let res = await fetch(
    `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`
  );
  let data = await res.json();
  return data;
}

async function getTypeFromAPI() {
  let res = await fetch('https://opentdb.com/api_category.php');
  let data = res.json();
  return data;
}

function* getQuizType() {
  let payload = yield call(getTypeFromAPI);
  yield put({ type: actQuiz.SET_QUIZ_TYPE, payload: payload });
}

function* getQuiz({ type, payload }) {
  let data = yield call(getQuizFromAPI, payload.category, payload.difficulty);
  yield put({ type: actQuiz.SET_QUIZ, payload: data });
}

function* getResult({ type, payload }) {
  yield put({ type: actQuiz.SET_RESULT, payload: payload });
}

function* reset() {
  yield put({ type: actQuiz.SET_RESET });
}

function* quizSaga() {
  yield takeEvery(actQuiz.GET_QUIZ_TYPE, getQuizType);
  yield takeEvery(actQuiz.GET_QUIZ, getQuiz);
  yield takeEvery(actQuiz.GET_RESULT, getResult);
  yield takeEvery(actQuiz.RESET, reset);
}

export default quizSaga;

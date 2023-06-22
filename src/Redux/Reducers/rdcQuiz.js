import actQuiz from '../Actions/actQuiz';

const initiateState = {
  lsQuizType: [],
};

const rdcQuiz = (state = initiateState, { type, payload }) => {
  switch (type) {
    case actQuiz.SET_QUIZ_TYPE:
      return {
        ...state,
        lsQuizType: payload,
      };
    default:
      return state;
  }
};

export default rdcQuiz;

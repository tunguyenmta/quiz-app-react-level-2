import actQuiz from '../Actions/actQuiz';

const initialState = {
  lsQuizType: [],
  lsQuiz: [],
};

const rdcQuiz = (state = initialState, { type, payload }) => {
  switch (type) {
    case actQuiz.SET_QUIZ_TYPE:
      return {
        ...state,
        lsQuizType: payload.trivia_categories,
      };
    case actQuiz.SET_QUIZ:
      let ans = payload.results.map((ele) => {
        return [...ele.incorrect_answers, ele.correct_answer];
      });
      ans.forEach((ele) => {
        for (let i = ele.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = ele[i];
          ele[i] = ele[j];
          ele[j] = temp;
        }
      });
      return {
        ...state,
        lsQuiz: {
          results: payload.results,
          random_answers: ans,
        },
      };
    case actQuiz.SET_RESULT: {
      let temp = [];
      for (let i = 0; i < Object.keys(payload).length; i++) {
        for (let key of Object.keys(payload)) {
          if (key.split('')[1] == i) {
            temp.push(payload[key]);
          }
        }
      }
      let score = 0;
      let lsCorrectAnswer = state.lsQuiz.results.map((ele) => {
        return ele.correct_answer;
      });
      let result = temp.map((ele, i) => {
        if (lsCorrectAnswer[i] == ele) {
          score += 1;
          return state.lsQuiz.random_answers[i].map((ans) => {
            return ans == ele
              ? { ans, bgColor: 'green' }
              : { ans, bgColor: 'transparent' };
          });
        } else {
          return state.lsQuiz.random_answers[i].map((ans) => {
            if (ans == lsCorrectAnswer[i]) {
              return { ans, bgColor: 'green' };
            } else if (ans == ele) {
              return { ans, bgColor: 'red' };
            } else {
              return { ans, bgColor: 'transparent' };
            }
          });
        }
      });
      let resultColor = '';
      if (score < 2) {
        resultColor = 'red';
      } else if (score >= 2 && score < 4) {
        resultColor = 'yellow';
      } else {
        resultColor = 'green';
      }
      return {
        ...state,
        result: result,
        score: score,
        resultColor: resultColor,
      };
    }
    case actQuiz.SET_RESET:
      return {
        ...initialState,
        lsQuizType: state.lsQuizType,
      };
    default:
      return state;
  }
};

export default rdcQuiz;

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import actQuiz from '../../Redux/Actions/actQuiz';
function Home(props) {
  useEffect(() => {
    props.getQuizType();
  }, []);
  return <div>{console.log(props.quizManage)}</div>;
}

const mapStatesToProps = (state) => {
  return {
    quizManage: state.quizManage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getQuizType: () => {
      dispatch({ type: actQuiz.GET_QUIZ_TYPE });
    },
  };
};
export default connect(mapStatesToProps, mapDispatchToProps)(Home);

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import actQuiz from '../../Redux/Actions/actQuiz';
import { useNavigate } from 'react-router-dom';
function Home(props) {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [answers, setAnswers] = useState({});
  useEffect(() => {
    props.getQuizType();
  }, []);
  const handleChange = (e) => {
    setCategory(e.target.value);
  };
  const handleDifficulty = (e) => {
    setDifficulty(e.target.value);
  };
  const handleClick = () => {
    props.getQuiz(category, difficulty);
  };
  const chooseAnswer = (e) => {
    setAnswers((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const submitAnswer = () => {
    props.getResult(answers);
    navigate('/results');
  };
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>QUIZ MAKER</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <select id="categorySelect" value={category} onChange={handleChange}>
            <option>Select a category</option>
            {props.quizManage.lsQuizType.length > 0 &&
              props.quizManage.lsQuizType.map((n) => {
                return (
                  <option key={n.id} value={n.id}>
                    {n.name}
                  </option>
                );
              })}
          </select>
          <select
            id="difficultySelect"
            onChange={handleDifficulty}
            value={difficulty}
          >
            <option>Select difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button id="createBtn" onClick={handleClick}>
            Create
          </button>
        </div>
      </div>
      <div className="display">
        {props.quizManage.lsQuiz.results &&
          props.quizManage.lsQuiz.results.map((ele, index) => {
            return (
              <div className="question" key={index + 10}>
                <p dangerouslySetInnerHTML={{ __html: ele.question }}></p>
                <div className="answerList">
                  {props.quizManage.lsQuiz.random_answers[index].map((n, i) => {
                    return (
                      <button
                        onClick={chooseAnswer}
                        name={`Q${index}`}
                        key={i + 50}
                        style={{
                          marginTop: '10px',
                          marginRight: '10px',
                          padding: '5px',
                          backgroundColor: `${
                            answers[`Q${index}`] === n ? 'green' : 'transparent'
                          }`,
                          border: '1px solid green',
                          borderRadius: '5px',
                          transition: '0.5s',
                        }}
                        className="btn-answer"
                        dangerouslySetInnerHTML={{ __html: n }}
                        value={n}
                      ></button>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
      {Object.keys(answers).length === 5 && (
        <button onClick={submitAnswer}>Submit</button>
      )}
    </div>
  );
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
    getQuiz: (category, difficulty) => {
      dispatch({ type: actQuiz.GET_QUIZ, payload: { category, difficulty } });
    },
    getResult: (lsAnswer) => {
      dispatch({ type: actQuiz.GET_RESULT, payload: lsAnswer });
    },
  };
};
export default connect(mapStatesToProps, mapDispatchToProps)(Home);

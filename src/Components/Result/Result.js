import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import actQuiz from '../../Redux/Actions/actQuiz';
function Result(props) {
  const navigate = useNavigate();
  const resetClick = () => {
    props.reset();
    navigate('/');
  };
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Results</h1>
      {props.quizManage.lsQuiz.results != undefined && (
        <div>
          {props.quizManage.lsQuiz != undefined &&
            props.quizManage.lsQuiz.results.map((ele, i) => {
              return (
                <div key={i}>
                  <p dangerouslySetInnerHTML={{ __html: ele.question }}></p>
                  <div>
                    {props.quizManage.lsQuiz.random_answers[i].map(
                      (ele, index) => {
                        return (
                          <button
                            style={{
                              backgroundColor: `${props.quizManage.result[i][index].bgColor}`,
                              color: `${
                                props.quizManage.result[i][index].bgColor !=
                                'transparent'
                                  ? 'white'
                                  : 'green'
                              }`,
                              border: '1px solid green',
                              padding: '5px',
                              marginRight: '10px',
                              borderRadius: '5px',
                            }}
                            key={index + 10}
                            dangerouslySetInnerHTML={{ __html: ele }}
                          ></button>
                        );
                      }
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      )}
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}
      >
        <p
          style={{
            textAlign: 'center',
            width: '50%',
            backgroundColor: `${props.quizManage.resultColor}`,
          }}
        >
          You scored{' '}
          {props.quizManage.score != undefined && props.quizManage.score} out of{' '}
          {props.quizManage.result != undefined &&
            props.quizManage.result.length}
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          style={{ width: '80%', padding: '5px', borderRadius: '5px' }}
          onClick={resetClick}
        >
          Create a new quiz
        </button>
      </div>
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
    reset: () => {
      dispatch({ type: actQuiz.RESET });
    },
  };
};

export default connect(mapStatesToProps, mapDispatchToProps)(Result);

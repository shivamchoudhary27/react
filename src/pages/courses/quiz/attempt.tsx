import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { getData, processQuizData } from '../../../adapters';
import './style.scss';
import PageLoader from '../../../widgets/loader/pageloader';
import Sidebar from '../../sidebar';
import Header from '../../header';
import ErrorBox from '../../../widgets/ErrorBox';
import QuestionsPageNav from './quizPageNave';
function qtype_shortanswer_process(elementname) {
  const answer = document.getElementsByName(elementname);
  const data = [];
  data.name = elementname;
  data.value = answer[0].value;
  return data;
}
function getRadioOptionsAnswer(elementname) {
  const answer = document.getElementsByName(elementname);
  const data = [];
  data.name = elementname;
  answer.forEach(index => {
    if (index.checked === true) {
      data.value = index.value;
    }
  });
  return data;
}
function qtype_multichoice_process(elementname) {
  return getRadioOptionsAnswer(elementname);
}
function qtype_truefalse_process(elementname) {
  return getRadioOptionsAnswer(elementname);
}
function qtypeSequencecheckValue(element, sequenceValue) {
  const sequence = [];
  sequence.name = element;
  sequence.value = sequenceValue;
  return sequence;
}
function qtypeFlaggedValue(element) {
  const flagged = [];
  const elements = document.getElementsByName(element);
  flagged.name = element;
  elements.forEach(index => {
    if (index.type === 'checkbox' && index.checked === true) {
      flagged.value = 1;
    } else {
      flagged.value = 0;
    }
  });
  return flagged;
}
function answerFetchError(qtype, elementname) {
  console.log(`Some error occurred while getting answers to ${qtype} type question with element ${elementname}`);
}
// collecting user's answers to the questions on the page
function getUserAnswers(quizData) {
  const data = [];
  quizData.questions.map(index => {
    const elementname = `q${quizData.attempt.uniqueid}:${index.slot}`;
    try {
      if (index.type === 'shortanswer') {
        data.push(qtype_shortanswer_process(`${elementname}_answer`));
      } else if (index.type === 'multichoice') {
        data.push(qtype_multichoice_process(`${elementname}_answer`));
      } else if (index.type === 'truefalse') {
        data.push(qtype_truefalse_process(`${elementname}_answer`));
      }
      data.push(qtypeFlaggedValue(`${elementname}_:flagged`));
      data.push(qtypeSequencecheckValue(`${elementname}_:sequencecheck`, index.sequencecheck));
    } catch (err) {
      answerFetchError(index.type, `${elementname}_answer`);
    }
  });
  return data;
}
function fetchPageQuestions(attemptid, next, setQuizData, setLoader) {
  const query = {
    wsfunction: 'mod_quiz_get_attempt_data',
    attemptid,
    page: next
  };
  try {
    getData(query)
      .then(res => {
        setQuizData(res.data);
        setLoader(false);
      })
      .catch(err => {
        console.log(err);
      });
  } catch (error) {
    console.log(error.message);
  }
}
const processAttempt = (nextpage, attemptid, quizData, finish = 0, setNext, navigate, courseid, instance) => {
  const userdata = getUserAnswers(quizData);
  let dataParam = '';
  Object.keys(userdata).map((item, index) => {
    dataParam += `data[${item}][name]=${userdata[index].name}&`;
    dataParam += `data[${item}][value]=${userdata[index].value}&`;
  });
  const saveResponse = {
    wsfunction: 'mod_quiz_process_attempt',
    attemptid,
    quizdata: dataParam,
    finishattempt: finish
  };
  processQuizData(saveResponse)
    .then(response => {
      if (response.data.state !== undefined) {
        if (response.data.state === 'inprogress') {
          setNext(nextpage);
        } else if (response.data.state === 'finished') {
          navigate(`/mod/quiz/${courseid}/${instance}`);
        } else if (response.data.errorcode !== undefined) {
          alert(response.data.message);
        }
      }
    })
    .catch(error => {
      console.log(error);
    });
};
function Attempt() {
  const { attemptid, courseid, instance } = useParams();
  const [quizData, setQuizData] = useState([]);
  const [showLoader, setLoader] = useState(true);
  const [next, setNext] = useState(0);
  const [nav, setNav] = useState(false);
  const [modname, setModname] = useState();
  const location = useLocation();
  const error = '';
  const navigate = useNavigate();
  const quizList = [];
  const [quizPages, setQuizPages] = useState({ currentPage: 0, totalPages: 0 });
  useEffect(
    () => {
      fetchPageQuestions(attemptid, next, setQuizData, setLoader);
    },
    [next]
  );
  useEffect(
    () => {
      if (Object.prototype.hasOwnProperty.call(quizData, 'attempt')) {
        const totalpages = quizData.attempt.layout.split(',0,').length;
        setQuizPages({
          totalPages: totalpages,
          currentPage: next
        });
      }
    },
    [quizData]
  );
  const finishAttempt = () => {
    if (window.confirm('Click ok to submit and finish!')) {
      processAttempt(0, attemptid, quizData, 1, setNext, navigate, courseid, instance);
    }
  };
  const changePage = page => {
    processAttempt(page, attemptid, quizData, 0, setNext, navigate, courseid, instance);
  };
  const nextPage = () => {
    processAttempt(quizData.nextpage, attemptid, quizData, 0, setNext, navigate, courseid, instance);
  };
  const previousPage = () => {
    if (quizData.nextpage === -1) {
      quizPages.totalPages > 1 && processAttempt(quizPages.totalPages - 2, attemptid, quizData, 0, setNext, navigate, courseid, instance);
    } else {
      const prevPage = quizData.nextpage - 2;
      prevPage > -1 && processAttempt(prevPage, attemptid, quizData, 0, setNext, navigate, courseid, instance);
    }
  };
  useEffect(
    () => {
      const courseids = [courseid];
      const query = {
        wsfunction: 'mod_quiz_get_quizzes_by_courses ',
        courseids
      };
      getData(query)
        .then(res => {
          if (res.status === 200 && res.data) {
            res.data.quizzes.map(navdata => {
              quizList.push(navdata);
              for (let quizListData of quizList) {
                if (location.state === null && quizData.attempt.quiz !== undefined && quizData.attempt.quiz === quizListData.id) {
                  setModname(quizListData.name);
                }
                if (location.state !== null) {
                  var { modnames } = location.state;
                  setModname(modnames);
                }
                if (quizData.attempt.quiz !== undefined && quizData.attempt.quiz === quizListData.id && quizListData.navmethod === 'free') {
                  setNav(true);
                }
                if (
                  quizData.attempt.quiz !== undefined &&
                  quizData.attempt.quiz === quizListData.id &&
                  quizListData.navmethod === 'sequential'
                ) {
                  setNav(false);
                }
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    [next, quizData]
  );
  if (showLoader === true) {
    return <PageLoader />;
  }
  return (
    <>
      <Sidebar />
      <Header quizHeading={modname} />
      <div className="quiz-container pt-4">
        <Row className="quiz-row">
          <div className="col-sm-9">
            <div>
              <h2>
                <ErrorBox msg={error} />
              </h2>
              {quizData.questions !== undefined &&
                quizData.questions.map(item => (
                  <div key={Math.random()} className="content mb-4" id="parent" dangerouslySetInnerHTML={{ __html: item.html }} />
                ))}
              <div className="text-center page-btn mb-3">
                <div>
                  {next > 0 &&
                    (nav == true ? (
                      <button type="button" className="pre-btn" onClick={previousPage}>
                        Previous{' '}
                      </button>
                    ) : null)}
                </div>
                <div>
                  {quizData.nextpage > 0 && (
                    <button type="button" className="next-btn" onClick={nextPage}>
                      Next
                    </button>
                  )}
                </div>
              </div>
              <div className="text-center finish-attempt-btn mb-5">
                <button type="button" className="finish-btn" onClick={finishAttempt}>
                  Finish Attempt
                </button>
              </div>
            </div>
          </div>

          <div className="col-sm-3 right-side-nav-bg">
            <div className="quiz-right-sidebar">
              {quizData.attempt === undefined && navigate('/')}
              {nav == true ? (
                <QuestionsPageNav quizPages={quizPages} finisAttempt={finishAttempt} changePage={changePage} />
              ) : (
                <QuestionsPageNav quizPages={quizPages} finisAttempt={finishAttempt} changePage={changePage} btnNav />
              )}
            </div>
          </div>
        </Row>
      </div>
    </>
  );
}
export default Attempt;

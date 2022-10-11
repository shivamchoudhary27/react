import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import Sidebar from '../../sidebar';
import Header from '../../header';
import { getData } from '../../../adapters';
import ModuleAccordion from '../../../widgets/accordian';
import UserContext from '../../../features/context/user/user';
import './style.scss';
import Errordiv from '../../../widgets/alert/errordiv';

function Startattempt() {
  const location = useLocation();
  const userCtx = useContext(UserContext);
  const userid = userCtx.userInfo.userid;
  const { instance, courseid } = useParams();
  const [button, setButton] = useState(false);
  const [startquiz, setStartquiz] = useState(false);
  const [modules, setModules] = useState({ status: false, data: [] });
  const [summary, setSummary] = useState(null);
  const [show, setShow] = useState(false);
  const [nav, setNav] = useState({ status: false, data: [] });
  const navigate = useNavigate();
  let initial = true;
  
  const startAttemptProcess = () => {
    setStartquiz(true);
  };

  useEffect(() => {
    const query = {
      wsfunction: 'mod_quiz_get_user_attempts',
      quizid: instance,
      userid,
      status: 'all',
      includepreviews: 1,
    };

    getData(query)
      .then((res) => {
        if (res.data.errorcode) {
          setShow(true);
        }

        else {
          setShow(false);
          setSummary(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [instance]);


  useEffect(() => {
    if (summary !== null && show === false) {
      const latestState = {};
      summary.attempts.map((i) => {
        latestState.attempt = i.id;
        latestState.state = i.state;
      });
      setButton(latestState);
    }

  }, [summary]);

  useEffect(() => {
    if (startquiz === true) {
      const query = {
        wsfunction: 'mod_quiz_start_attempt',
        quizid: instance,
      };
      getData(query)
        .then((res) => {
          if (res.status === 200 && res.data) {
            if (res.data.attempt.id !== undefined) {
              navigate(`/mod/attempt/quiz/${instance}/${res.data.attempt.id}/${courseid}`);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [startquiz]);


  useEffect(() => {
    const query = {
      wsfunction: 'core_course_get_contents',
      courseid
    };
    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data) {
          if (res.data.errorcode !== undefined) {
            setModules({
              status: false,
              data: 'Error while fetching modules',
            });
          }
          if (initial === true) {
            var list = []
            res.data.map((courses) => {
              list.push(courses);
              setNav({
                status: true,
                data: list,
              })
            });
          }

        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [instance, courseid]);
  useEffect(() => {
    if (location.state === null) {
      nav.data.map((mod) => (
        mod.modules.map((activity) => {
          if (activity.instance == instance && activity.modname == 'quiz') {
            setModules({
              status: true,
              modname: activity.name
            })
          }
        })
      ));
    }
    else {
      const { modname } = location.state;
      setModules({
        status: true,
        modname,
      })
    }
  }, [nav])
  
  return (
    <>
      <Sidebar />
      <Header quizHeading={modules.modname} />
      <div className="attempt-container pt-4">
        {show === true ? <Errordiv cstate={show} msg="Something went wrong" /> :
          <Row className="attempt-row">
            <div className="col-sm-9">
              <div>
                <div className="text-center">
                  {button.state === 'inprogress' ? (
                    <Link to={`/mod/attempt/quiz/${instance}/${button.attempt}/${courseid}`}
                      state={{ modnames: location.state !== null ? modules.modname : nav.modname }}>
                      <button type="button" className="attempt-btn">
                        Continue the last attempt
                      </button>
                    </Link>
                  ) : (
                    <button type="button" className="attempt-btn" onClick={startAttemptProcess}>
                      Attempt quiz
                    </button>
                  )}

                  <Link to="#">
                    <p>
                      Attempts:
                      {summary !== null && summary.attempts.length}
                    </p>
                  </Link>
                  {summary !== null && summary.attempts.length == 0 && "No attempts"}
                  {summary !== null && summary.attempts.length == 1 ?
                    <div>
                      <h4><b>Summary of your previous attempts</b></h4>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Attempt</th>
                            <th scope="col">State</th>
                            <th scope="col">Review</th>
                          </tr>
                        </thead>
                        <tbody>
                          {summary !== null && summary.attempts.map((summarydata, i) => (
                            <tr key={i}>
                              <td>Preview</td>
                              <td>{summarydata.state}</td>
                              <td>--</td>
                            </tr>
                          ))}
                        </tbody>
                      </table> </div> : <div><table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Attempt</th>
                            <th scope="col">State</th>
                            <th scope="col">Marks / 12.00</th>
                            <th scope="col">Grade / 10.00</th>
                            <th scope="col">Review</th>
                          </tr>
                        </thead>

                        <tbody>
                          {summary !== null && summary.attempts.map((summarydata, i) => (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{summarydata.state}</td>
                              <td>{summarydata.sumgrades}</td>
                              {summarydata.state === "finished" && <>
                                <td>8</td>
                                <td><Link to={`/mod/quiz/review/${summarydata.id}/${summarydata.quiz}/${courseid}`}
                                  state={{ modnames: location.state != null ? modules.modname : nav.modname }}
                                  style={{ textDecoration: "none" }}>Review</Link></td></>}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  }
                </div>
              </div>
            </div>

            <div className="col-sm-3">
              <div className="quiz-right-sidebar">
                {nav.status === false ? (
                  <ModuleAccordion modules={false} header="Modules" items={[]} />
                ) : (
                  nav.data.map((section, i) => (

                    <ModuleAccordion
                      header={section.name}
                      items={section.modules}
                      key={i}
                      courseid={courseid}
                    />
                  ))
                )}
              </div>
            </div>
          </Row>
        }
      </div>

    </>
  );
}
export default Startattempt;

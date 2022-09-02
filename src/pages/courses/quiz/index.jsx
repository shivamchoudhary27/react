import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import Sidebar from '../../sidebar';
import Header from '../../header';
import { getData } from '../../../adapters';
import ModuleAccordion from '../../../widgets/accordian';
import './style.scss';

function Startattempt() {
  const userid = localStorage.getItem('userid');
  const { name, instance, courseid } = useParams();
  const [button, setButton] = useState(false);
  const [startquiz, setStartquiz] = useState(false);
  const [modules, setModules] = useState({ status: false, data: [] });
  const [summary, setSummary] = useState(null);
  const navigate = useNavigate();

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
        if (res.status === 200 && res.data) {
          setSummary(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [instance]);

  useEffect(() => {
    if (summary !== null) {
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
              navigate(`/mod/attempt/quiz/${res.data.attempt.id}/${courseid}`);
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
      courseid,
    };
    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data) {
          if (res.data.errorcode !== undefined) {
            setModules({
              status: false,
              data: 'Error while fetching modules',
            });
          } else {
            setModules({
              status: true,
              data: res.data,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Sidebar />
      <Header quizHeading={name} />
      <div className="attempt-container pt-4">
        <Row className="attempt-row">
          <div className="col-sm-9">
            <div>
              <div className="text-center">
                {button.state === 'inprogress' ? (
                  <Link to={`/mod/attempt/quiz/${button.attempt}/${courseid}`}>
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

                <h4><b>Summary of your previous attempts</b></h4>
                <table className="table">
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
                    {summary !== null && summary.attempts.map((a, i) => (
                      <tr key={i}>
                        <td>Preview</td>
                        <td>{a.state}</td>
                        <td>{a.sumgrades}</td>
                        <td>8</td>
                        <td>--</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="quiz-right-sidebar">
              {modules.status === false ? (
                <ModuleAccordion modules={false} header="Modules" items={[]} />
              ) : (
                modules.data.map((section, i) => (
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
      </div>
    </>
  );
}
export default Startattempt;

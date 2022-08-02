
import Sidebar from "../../sidebar";
import React, { useState, useEffect } from "react";
import Header from "../../header";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getData } from "../../../adapters";


const Startattempt = () => {
  const userid = localStorage.getItem("userid");
  const { name, instance } = useParams();
  const [show, setShow] = useState(true);
  const [attemptid, setAttemptid] = useState({});
  const [button, setButton] = useState(false);
  const [startquiz, setStartquiz] = useState(false);
  
  const navigate = useNavigate();

  const start_attempt = () => {
    setStartquiz(true);
  }

  useEffect(() => {
    const query = {
      wsfunction: "mod_quiz_get_user_attempts",
      quizid: instance,
      userid: userid,
      status: "unfinished"
    };

    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data) {
          if (((res.data.attempts).length) === 0) {
            // alert('yuy')
            setButton(true);
            
          }
          else {
            setAttemptid(res.data.attempts[0].id);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (startquiz === true) {
      const query = {
        wsfunction: "mod_quiz_start_attempt",
        quizid: instance,
      };
      getData(query)
        .then((res) => {
          if (res.status === 200 && res.data) {
            if (res.data.attempt.id !== undefined) {
              navigate(`/mod/attempt/quiz/${res.data.attempt.id}`);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [startquiz]);

  const showSide = () => {
    setShow(!show);
  };

  return (
    <>
      <main className={show ? "space-toggle" : null}>
        <Header toggleFun={showSide} currentState={show} />
        <Sidebar currentState={show} />
        <div className="card">
          <div className="card-body">
            <h3>{name}</h3>
            {
              button === false ? (<Link to={`/mod/attempt/quiz/${attemptid}`}><button className="btn btn-warning" >Continue the last attempt</button></Link>) :
                (<button className="btn btn-warning" onClick={start_attempt}>Attempt quiz</button>)
            }
          </div>
        </div>
      </main>

    </>
  );

}
export default Startattempt;

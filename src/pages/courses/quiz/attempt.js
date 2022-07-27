import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../../adapters";
import "./style.css";
import PageLoader from "../../../widgets/loader/pageloader";
import Header from "../../header";
import Footer from "../../footer";
import Sidebar from "../../sidebar";
import ErrorBox from "../../../widgets/ErrorBox";
import BreadCrumb from "../../../widgets/BreadCrumb";

function Attempt() {
  const { attemptid } = useParams();
  const [quizData, setQuizData] = useState([]);
//   const [quizProcess, setQuizProcess] = useState([]);
  const [process, setProcess] = useState();
  const [showLoader, setLoader] = useState(true);
  const [next, setNext] = useState(0);
  const [show, setShow] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const query = {
      wsfunction: "mod_quiz_get_attempt_data",
      attemptid: attemptid,
      page: next,
    };
    console.log("the request");
    console.log();
    getData(query)
      .then((res) => {
        setQuizData(res.data);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [next]);

  console.log(quizData);

  // useEffect(() => {
  //   var data = [];
  //   var keyName = "name", keyVal = "value";
  //   data[0][keyName] = "q343:3_answer";
  //   data[0][keyVal] = 0;
  //   const query = {
  //     wsfunction: "mod_quiz_process_attempt",
  //     attid: 406,
  //     data: data
  //   };
  //   getData(query)
  //     .then((res) => {
  //       setQuizProcess(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // console.log(nextpage);

  const processAttempt = () => {
    setProcess(alert("Finish Attempt"));
  };

  const nextPage = () => {
    console.log("value of next state" + next);
    if (quizData.nextpage == -1) {
      alert("invalid page");
    } else {
      setNext(quizData.nextpage);
    }
  };

  const previousPage = () => {
    console.log("value of next state" + next);
    let x = quizData.attempt.currentpage - 1;
    alert(x);
    setNext(x);
  };

  if (showLoader === true) {
    return <PageLoader />;
  }

  const showSide = () => {
    setShow(!show);
  };

  return (
    <>
      <main className={show ? "space-toggle" : null}>
        <Header toggleFun={showSide} currentState={show} />
        <Sidebar currentState={show} />
        <h2>{<ErrorBox msg={error} />}</h2>
        <BreadCrumb
          title="Quiz"
          breadcrumbItem={[
            ["Home", "/dashboard", true],
            ["Course", "/mycourse", true],
            ["Courseview", "/courseview", true],
            ["Quiz", "/quiz", false],
          ]}
        />
        {quizData.questions.map((item, index) => (
          <div
            key={index}
            className="content mb-4"
            id="parent"
            dangerouslySetInnerHTML={{ __html: item.html }}
          ></div>
        ))}
        <div className="text-center mb-3">
          <button className="btn btn-sm btn-primary" onClick={previousPage}>
            Previous
          </button>
          <button className="btn btn-sm btn-primary" onClick={nextPage}>
            Next
          </button>
        </div>
        <div className="text-center mb-5">
          <button className="btn btn-warning" onClick={processAttempt}>
            Finish Attempt
          </button>
        </div>
        <Footer />
      </main>
    </>
  );
}

export default Attempt;

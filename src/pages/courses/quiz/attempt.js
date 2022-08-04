import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getData, processQuizData } from "../../../adapters";
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
  const [showLoader, setLoader] = useState(true);
  const [next, setNext] = useState(0);
  const [show, setShow] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch_page_questions(attemptid, next, setQuizData, setLoader);
  }, [next]);

  const finishAttempt = () => {
    if (window.confirm("Click ok to submit and finish!")) {
      processAttempt(0, attemptid, quizData, 1, setNext, navigate);
    }   
  };

  const nextPage = () => {
    if (quizData.nextpage === -1) {
      alert("There's no next page");
      return;
    }
    processAttempt(quizData.nextpage, attemptid, quizData, 0, setNext, navigate);
  };
  
  const previousPage = () => {
    if (quizData.nextpage === -1) {
      let totalpages = quizData.attempt.layout.split(",0,").length - 1;
      (totalpages > 1) && processAttempt(totalpages - 1, attemptid, quizData, 0, setNext, navigate); 
    } else {
      let prevPage = quizData.nextpage - 2; 
      (prevPage > -1) ? processAttempt(prevPage, attemptid, quizData, 0, setNext, navigate) : window.alert('This is the first page');
    }
  };

  const showSide = () => {
    setShow(!show);
  };
  
  if (showLoader === true) {
    return <PageLoader />;
  }

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
          <button className="btn btn-warning" onClick={finishAttempt}>
            Finish Attempt
          </button>
        </div>
        <Footer />
      </main>
    </>
  );
}

export default Attempt;

// collecting user's answers to the questions on the page
function getUserAnswers (quizData) {
  let data = [];

  quizData.questions.map((index) => {
    let qtypeMethod = 'qtype_' + index.type + '_process';
    let elementname = 'q' + quizData.attempt.uniqueid + ':' + index.slot;

    try {
      qtypeMethod = eval(qtypeMethod);
      data.push(qtypeMethod(elementname + '_answer'));
      data.push(qtype_flagged_value(elementname + "_:flagged"));
      data.push(qtype_sequencecheck_value(elementname + "_:sequencecheck", index.sequencecheck));
    } catch (err) {
      answer_fetch_error(index.type, elementname + '_answer');
    }
  });

  return data;
}

function qtype_shortanswer_process (elementname) {
  let answer = document.getElementsByName(elementname);
  let data = [];
  data['name'] = elementname;  
  data['value'] = answer[0].value;
  return data;
}

function qtype_multichoice_process (elementname) {
  return get_radio_options_answer (elementname);
}

function qtype_truefalse_process (elementname) {
  return get_radio_options_answer (elementname);
}

function get_radio_options_answer (elementname) {
  let answer = document.getElementsByName(elementname);
  let data = []; 
  data['name'] = elementname;
  answer.forEach((index) => {
    if (index.checked === true) {
      data['value'] = index.value;
    }
  });
  return data;
}

function qtype_sequencecheck_value (element, sequenceValue) {
  let sequence = [];
  sequence['name'] = element;
  sequence['value'] = sequenceValue
  return sequence;
}

function qtype_flagged_value (element) {
  let flagged = [];
  let elements = document.getElementsByName(element);
  
  flagged['name'] = element;
  elements.forEach((index) => {
    if (index.type === 'checkbox' && index.checked === true) {
      flagged['value'] = 1;
    } else {
      flagged['value'] = 0;
    }
  });

  return flagged;
}

function answer_fetch_error (qtype, elementname) {
  console.log('Some error occurred while getting answers to ' + qtype + ' type question with element ' + elementname);
}

function construct_answer_element_name () {
  // in progress
}
function construct_flagged_element_name () {
  // in progress
}

function fetch_page_questions (attemptid, next, setQuizData, setLoader) {
  const query = {
    wsfunction: "mod_quiz_get_attempt_data",
    attemptid: attemptid,
    page: next,
  };

  getData(query)
    .then((res) => {
      setQuizData(res.data);
      setLoader(false);
    })
    .catch((err) => {
      console.log(err);
    });
}

const processAttempt = (nextpage, attemptid, quizData, finish = 0, setNext, navigate) => {
  let userdata = getUserAnswers(quizData);
  var dataParam = '';
  Object.keys(userdata).map((item,index) => {
    dataParam += `data[${item}][name]` + "=" + userdata[index].name + "&"
    dataParam += `data[${item}][value]` + "=" + userdata[index].value + "&"
  })

  const saveResponse = {
    wsfunction: "mod_quiz_process_attempt",
    attemptid: attemptid,
    quizdata: dataParam,
    finishattempt: finish,
  };

  processQuizData(saveResponse)
    .then( (response) => {
        console.log(response.data);
        if (response.data.state !== undefined) {
           if (response.data.state === "inprogress") {
              setNext(nextpage);
           } else if (response.data.state === "finished") {
              alert('This attempt is finished');
              navigate('/mycourse');
           } else if (response.data.errorcode !== undefined) {
              alert(response.data.message);
           }
        }
    })
    .catch((error) => {
        console.log(error);
    });
}
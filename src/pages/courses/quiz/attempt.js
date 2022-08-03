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
  }, [next]);

  const finishAttempt = () => {
    if (window.confirm("Click ok to submit and finish!")) {
      processAttempt(0, 1);
    }   
  };

  const nextPage = () => {
    if (quizData.nextpage === -1) {
      alert("There's no next page");
      return;
    }
    processAttempt(quizData.nextpage);
  };
  
  const previousPage = () => {
    if (quizData.nextpage === -1) {
      let totalpages = quizData.attempt.layout.split(",0,").length - 1;
      (totalpages > 1) && processAttempt(totalpages - 1); 
    } else {
      let prevPage = quizData.nextpage - 2; 
      (prevPage > -1) ? processAttempt(prevPage) : window.alert('This is the first page');
    }
  };

  const processAttempt = (nextpage, finish = 0) => {
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
    let userAnswer = [];
    let qtypeMethod = 'qtype_' + index.type + '_process';
    
    try {
      qtypeMethod = eval(qtypeMethod);
      userAnswer = qtypeMethod(quizData.attempt.uniqueid, index.slot);
      data.push(userAnswer);
      data.push(dummy_sequence_flagged(index.sequencecheck , 'q' + quizData.attempt.uniqueid + ':' + index.slot));
    } catch (err) {
      answer_fetch_error(index.type, quizData.attempt.uniqueid, index.slot);
    }
  });

  return data;
}

function qtype_shortanswer_process (uniqueId, slot) {
  var element =  'q' + uniqueId + ':' + slot;
  var answer = document.getElementsByName(element + '_answer');
  const data = []; 
  data['name'] = element + '_answer';  
  data['value'] = answer[0].value;
  return data;
}

function qtype_multichoice_process (uniqueId, slot) {
  return get_radio_options_answer (uniqueId, slot);
}

function qtype_truefalse_process (uniqueId, slot) {
  return get_radio_options_answer (uniqueId, slot);
}

function get_radio_options_answer (uniqueId, slot) {
  let element =  'q' + uniqueId + ':' + slot;
  let answer = document.getElementsByName(element + '_answer');
  let data = []; 
  data['name'] = element + '_answer';
  answer.forEach((index) => {
    if (index.checked === true) {
      data['value'] = index.value;
    }
  });
  return data;
}

function dummy_sequence_flagged (sequenceValue, element) {
  let sequence = [];
  sequence['name'] = element + "_:sequencecheck";
  sequence['value'] = sequenceValue
  return sequence;
}

function answer_fetch_error (qtype, uniqueId, slot) {
  let element =  'q' + uniqueId + ':' + slot + '_answer';
  console.log('Some error occurred while getting answers to ' + qtype + ' type question with element ' + element);
}

function construct_answer_element_name () {
  // in progress
}
function construct_flagged_element_name () {
  // in progress
}


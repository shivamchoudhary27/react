import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  const [jet, setJet] = useState([]);
  
  // this effect to get questions data with requested page
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

  const processAttempt = () => {
    alert('Finish attempt in progress ... !');
  };

  const nextPage = () => {
    if (quizData.nextpage === -1) {
      alert("There's no next page");
      return;
    }
    let userdata = getUserAnswers(quizData);

    let setThispage = [];
    setThispage['name'] = 'thispage'; //"q9:1_answer"; //   
    setThispage['value'] = quizData.attempt.currentpage; //"the dummy answer";// 
    userdata.push(setThispage);

    let setNextpage = [];
    setNextpage['name'] = 'nextpage'; //"q9:1_answer"; //   
    setNextpage['value'] = quizData.nextpage; //"the dummy answer";//
    userdata.push(setNextpage);

    var dataParam = '';
    Object.keys(userdata).map((item,index) => {
      dataParam += `data[${item}][name]` + "=" + userdata[index].name + "&"
      dataParam += `data[${item}][value]` + "=" + userdata[index].value + "&"
    })

    const saveResponse = {
      wsfunction: "mod_quiz_process_attempt",
      attemptid: attemptid,
      quizdata: dataParam,
      finishattempt: 0,
    };

    processQuizData(saveResponse)
      .then( (response) => {
          console.log(response.data);
          if (response.data.state !== undefined) {
             if (response.data.state === "inprogress") {
                setNext(quizData.nextpage);
             } else if (response.data.state === "finished") {
                alert('This attempt is finished');
             }
          }
      })
      .catch((error) => {
          console.log(error);
          // return error;
      });
  };
  
  const previousPage = () => {
    alert('Previous in progress');
    return;
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


function getUserAnswers (quizData) {
  let data = [];
  quizData.questions.map((index) => {
    let userAnswer = [];
    if (index.type === "shortanswer") {
      userAnswer = qtype_shortanswer_process(quizData.attempt.uniqueid, index.slot);
      data.push(userAnswer);
    } else if (index.type === "multichoice") {
      userAnswer = qtype_multichoice_process(quizData.attempt.uniqueid, index.slot);
      data.push(userAnswer);
    }
    data.push(dummy_sequence_flagged(index.sequencecheck , 'q' + quizData.attempt.uniqueid + ':' + index.slot));
  });
  return data;
}

function qtype_shortanswer_process (uniqueId, slot) {
  var element =  'q' + uniqueId + ':' + slot;
  var answer = document.getElementsByName(element + '_answer');
  const data = []; 
  data['name'] = element + '_answer'; //"q9:1_answer"; //   
  data['value'] = answer[0].value; //"the dummy answer";// 
  return data; 
}

function qtype_multichoice_process (uniqueId, slot) {
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
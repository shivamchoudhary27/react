
import Sidebar from "../sidebar";
import React,{ useState,useEffect } from "react";
import Header from "../header";
import { useParams,Link } from "react-router-dom";
import { getData } from "../../adapters";

const Startattempt = () => {
    const { name,instance } = useParams();
    const [show, setShow] = useState(true);
    const[attemptid,setAttemptid] = useState({});
    const[button,setButton] = useState(false);
    const[a,setA] = useState(false);
    
    
    // quizid = 23;

    useEffect(() => {
        const query = {
          wsfunction: "mod_quiz_get_user_attempts",
          quizid: instance,
          userid:159,
          status: "unfinished"
          
          
        };
        // console.log(query.quizid);
        getData(query)
          .then((res) => {
            if (res.status === 200 && res.data) {
                // console.log((res.data.attempts).length);
                
                if(((res.data.attempts).length) === 0){
                    console.log("hello");   
                    setButton(true);
                    console.log(button);
                    // console.log(res.data.attempts[0].state);
                }
                else{
                    setAttemptid(res.data);
                    console.log(attemptid);
                }
                
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

    const showSide = () => {
        setShow(!show);
      };
    //  console.log(button);
    return (
        <>
        <main className={show ? "space-toggle" : null}>
        <Header toggleFun={showSide} currentState={show} />
        <Sidebar currentState={show} />
        {/* <h1>hello</h1> */}
        
        <div className="card">
            <div className="card-body">
                <h3>{name}</h3>
                {
                button===false ? (<Link to={`/mod/view/quiz/`}><button className="btn btn-warning" >Continue your attempt</button></Link>):
                (<Link to={`/mod/view/quiz/`}><button className="btn btn-warning" >Attempt quiz</button></Link>)
                }
           
            </div>

        </div>
        </main>

        </>
    );

}
export default Startattempt;
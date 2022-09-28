import React, { useState, useEffect } from 'react';
import Sidebar from "../../../sidebar";
import Header from "../../../header";
import { useParams,Link } from "react-router-dom";
import { getData } from '../../../../adapters';
import { Row } from 'react-bootstrap';

const Review = () => {
    const [ques, setQues] = useState();
    const { attemptid,name,quizid,courseid } = useParams();

    useEffect(() => {
        const query = {
            wsfunction: 'mod_quiz_get_attempt_review',
            attemptid: attemptid,
            
        };

        getData(query)
            .then((res) => {
                if (res.status === 200 && res.data) {
                    setQues(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Sidebar />
            <Header quizHeading="Personality test" />
            <div className="quiz-container pt-4">
                <Row className="quiz-row">
                    <div>
                        {ques != undefined &&
                            ques.questions.map((question) => (
                                <div
                                    key={Math.random()}
                                    className="content mb-4"
                                    id="parent"
                                    dangerouslySetInnerHTML={{ __html: question.html }}
                                />
                            ))}
                    </div>
                    {ques !== undefined && <Link to={`/mod/quiz/${name}/${quizid}/${courseid}`}><h5>Finish Review</h5></Link>}
                    <div />
                </Row>
            </div>

        </>
    );
}
export default Review
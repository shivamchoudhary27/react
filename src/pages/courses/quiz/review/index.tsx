import React, { useState, useEffect } from "react";
import Sidebar from "../../../sidebar";
import Header from "../../../header";
import { useParams, Link, useLocation } from "react-router-dom";
import { getData } from "../../../../adapters";
import { Row } from "react-bootstrap";
const Review = () => {
    const [ques, setQues] = useState<any>();
    const { attemptid, quizid, courseid } = useParams();
    const [activityname, setActivityName] = useState();
    const location = useLocation();
    useEffect(() => {
        const query = {
            wsfunction: "mod_quiz_get_attempt_review",
            attemptid: attemptid
        };
        getData(query)
            .then(res => {
                if (res.status === 200 && res.data) {
                    setQues(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    if (location.state !== null) {
        var { modnames } = location.state;
    } else {
        const courseids = [courseid];
        const query = {
            wsfunction: "mod_quiz_get_quizzes_by_courses",
            courseids
        };
        getData(query)
            .then(res => {
                if (res.status === 200 && res.data) {
                    const activitylist: any[] = [];
                    res.data.quizzes.map((courseList: any) => {
                        activitylist.push(courseList);
                        for (let activitylistData of activitylist) {
                            if (quizid === activitylistData.id) {
                                setActivityName(activitylistData.name);
                            }
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    return (
        <>
            <Sidebar />
            <Header pageHeading={location.state != null ? modnames : activityname}  welcomeIcon={false}/>
            <div className="quiz-container pt-4">
                <Row className="quiz-row">
                    <div>
                        {ques !== undefined &&
                            ques.questions.map((question: { html: any; }) => (
                                <div
                                    key={Math.random()}
                                    className="content mb-4"
                                    id="parent"
                                    dangerouslySetInnerHTML={{ __html: question.html }}
                                />
                            ))}
                    </div>
                    {ques !== undefined && (
                        <Link to={`/mod/quiz/${courseid}/${quizid}`}>
                            <h5>Finish Review</h5>
                        </Link>
                    )}
                    <div />
                </Row>
            </div>
        </>
    );
};
export default Review;

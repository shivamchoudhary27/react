import React from 'react';
import {Row} from "react-bootstrap";

const Coursecataloguecard = (props) =>{
    return(
        <>
            <Row className="ai-course-shadow mb-4">
                <div className="col-sm-3">
                    <img className="w-100 ai-course-image" src={props.image} alt="ai-course-image"/>
                </div>
                <div className="col-sm-9 ai-course-details">
                    <Row>
                        <div className="col-sm-9">
                            <p className="ai-course-heading">{props.course_heading}</p>
                            <p className="ai-course-text">{props.course_text}</p>
                            <p className="ai-course-date">Updated on <b>{props.course_date}</b></p>
                            <p className="ai-course-review">{props.course_review}</p>
                        </div>
                        <div className="col-sm-3 ai-course-get-started-btn">
                            <div>
                                <button className="ai-course-button">{props.course_button}</button>
                            </div>
                        </div>
                    </Row>
                </div>
            </Row>
        </>
    )
}

export default Coursecataloguecard;
import React from "react";
import "./style.scss";
import { Row } from "react-bootstrap";
import imgLogo from "../../../assets/images/jslogo.png";
import ProgressBar from 'react-bootstrap/ProgressBar';

function MyCourseCard(props) {
  return (
    <>
      <div className="ai-course">
        <div className="ai-border">
          <Row>
            <div className="col-sm-10">
              <h5 className="card-title">{props.mycoursedata.fullname}</h5>
              <p>
                {props.mycoursedata.summary.replace(/(<([^>]+)>)/gi, "").substr(0, 30)}
                Some quick example text to build on the card title.
              </p>
            </div>
            <div className="col-sm-2">
              <div>
                <img src={imgLogo} className="course-image" alt="bannerimage" />
              </div>
            </div>
          </Row>
        </div>
        <div>
          <span className="progress-percentage">71%</span>
          <span className="percentage-status">Completed</span>
          <ProgressBar now="71"/>
        </div>
        <div className="course-duration-content">
          <ul className="course-duration">
            <li>
              <i class="fa fa-clock-o"></i>
            </li>
            <li>
              <b>10 Days</b> left to finish
            </li>
            <li className="third-child">
              <button className="course-btn">
                Continue <i class="fa fa-long-arrow-right"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default MyCourseCard;

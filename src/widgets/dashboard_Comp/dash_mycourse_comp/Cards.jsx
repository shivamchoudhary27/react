import React, { useContext } from 'react';
import './style.scss';
import { Row } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Link } from 'react-router-dom';
import imgLogo from '../../../assets/images/jslogo.png';
import UserContext from '../../../features/context/user/user';

function MyCourseCard(props) {
  let toComplete = '';
  if (props.mycoursedata.completed === true) {
    toComplete = 'Completed';
  } else {
    const unixTime = props.mycoursedata.enddate;
    const date = new Date(unixTime * 1000);
    const finishDate = date.toLocaleDateString('en-IN');
    toComplete = `Finish date ${finishDate}`;
  }
  const userCtx = useContext(UserContext);
  const userToken = userCtx.token;
  return (
    <>
      <div className="ai-course">
        <div className="ai-border">
          <Row>
            <div className="col-sm-10 card-left-column">
              {/* <Link to={`/courseview/${props.mycoursedata.id}/${props.mycoursedata.fullname}`}> */}
              <div className="course-heading-google">
                <h5 className="card-title">{props.mycoursedata.fullname.substr(0, 30)}</h5>
              </div>
              {/* </Link>  */}
              <div className="google-course-text">
                <p>
                  {props.mycoursedata.summary.replace(/(<([^>]+)>)/gi, "").substr(0, 70)}.....
                </p>
              </div>
            </div>
            <div className="col-sm-2 card-right-column">
              <div className="card-right-column-image">
                <Link to={`/courseview/${props.mycoursedata.id}/${props.mycoursedata.fullname}`}>
                {
                  (props.mycoursedata.overviewfiles.length !== 0) ?
                  <img src={`${props.mycoursedata.overviewfiles[0].fileurl}?token=${userToken}`} className="course-image" alt="bannerimage" />
                  :
                  <img src={imgLogo} className="course-image" alt="bannerimage" />
                }
                </Link>  
              </div>
            </div>
          </Row>
        </div>
        <div>
          <span className="progress-percentage">{(props.mycoursedata.progress === null) ? `0` : Math.round(props.mycoursedata.progress)}%</span>
          <span className="percentage-status">{props.mycoursedata.completed === false ? 'Not completed' : 'Completed'}</span>
          <ProgressBar now={props.mycoursedata.progress}/>
        </div>
        <div className="course-duration-content">
          <ul className="course-duration">
            <li>
              <i className="fa fa-clock-o"></i>
            </li>
            <li>
              {toComplete}
              {/* <b>10 Days</b> left to finish */}
            </li>
            <li className="third-child">
              <Link style={{textDecoration: "none"}} to={`/courseview/${props.mycoursedata.id}`}>
                <button className="course-btn">
                  Continue &nbsp;<i className="fa fa-angles-right"></i>
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default MyCourseCard;

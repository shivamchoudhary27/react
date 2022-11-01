import React, { useContext, useState } from 'react';
import './style.scss';
import { Row } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Link, useNavigate } from 'react-router-dom';
import imgLogo from '../../../assets/images/jslogo.png';
import UserContext from '../../../features/context/user/user';
import { getData } from '../../../adapters';
import { useEffect } from 'react';

function MyCourseCard(props) {
  let accessBtn, courseDate = '';
  const currentTab = props.currentTab;
  const userCtx = useContext(UserContext);
  const userToken = userCtx.token;
  const navigate = useNavigate();
  const userId = userCtx.userInfo.userid;
  const [newstate, setNewstate] = useState(false);
  const [title, setTitle] = useState();
  const courseid = props.mycoursedata.id;
  const resumeCourseKey = 'crs-' + courseid + '-' + userId;
  let toComplete = '';

  if (props.mycoursedata.completed === true) {
    toComplete = 'Completed';
  } else {
    const unixTime = props.mycoursedata.enddate;
    const date = new Date(unixTime * 1000);
    const finishDate = date.toLocaleDateString('en-IN');
    toComplete = `Finish date ${finishDate}`;
  }
  if (currentTab === 1) {
    accessBtn = 'Resume';
    if (props.mycoursedata.enddate === 0) courseDate = '';
    else {
      const finishDate = new Date(props.mycoursedata.enddate * 1000).toLocaleDateString('en-IN');
      courseDate = `End date ${finishDate}`;
    }
  } else if (currentTab === 2) {
    accessBtn = 'View';
    if (props.mycoursedata.enddate === 0) courseDate = '';
    else {
      const startDate = new Date(props.mycoursedata.enddate * 1000)
      courseDate = `End date: ${startDate.toLocaleDateString('en-IN')}`;
    }
  } else {
    accessBtn = 'Yet to start';
    const startDate = new Date(props.mycoursedata.startdate * 1000)
    courseDate = `Start date: ${startDate.toLocaleDateString('en-IN')}`;
  }

  useEffect(() => {
    const query = {
      wsfunction: 'core_course_get_contents',
      courseid,
    };
    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data) {
          if (newstate === true) {
            let breakLoop = false;
            for (let data of res.data) {
              for (let val of data.modules) {
                // let latestKey = userId + '-' + courseid + '-' + val.instance;
                if (val.modname == "quiz") {
                  localStorage.setItem(resumeCourseKey, val.instance + '-' + val.modname);
                  navigate(`/mod/quiz/${courseid}/${val.instance}`,{ state:{ modname: val.name }});
                  breakLoop = true;
                  break;
                }
                else if (val.modname === "resource") {
                  console.log(`/mod/video/${val.id}/${courseid}`);
                  localStorage.setItem(resumeCourseKey, val.id + '-' + val.modname);
                  navigate(`/mod/video/${val.id}/${courseid}`);
                  breakLoop = true;
                  break;
                }
              }
              if (breakLoop === true) break;
            }

          } else {
            let arr = [];
            res.data.map((val) => {
              val.modules.map((modname) => {
                arr.push(modname);
              })
              setTitle(arr);
            })
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }, [newstate]);

  function handleClick() {
    let lastCourseStatus = localStorage.getItem(resumeCourseKey);
    if (lastCourseStatus === null) {
      setNewstate(true);
    } else {
    
      lastCourseStatus = lastCourseStatus.split('-');
      for (let data of title) {
        if (lastCourseStatus[1] === "quiz" && data.modname === "quiz") {
          console.log("****");
          if (lastCourseStatus[0] == data.instance) {
            navigate(`/mod/quiz/${courseid}/${lastCourseStatus[0]}`, { state: { modname: data.name } });
          }
        } else if (lastCourseStatus[1] === "resource" && data.modname === "resource") {
          console.log("resource");
          if (lastCourseStatus[0] == data.id) {
            data.contents !== undefined &&
              navigate(`/mod/video/${lastCourseStatus[0]}/${courseid}`, { state: { modurl: data.contents[0].fileurl, modname: data.name } });
          }

        }
      }
    }
  }

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
          <ProgressBar now={props.mycoursedata.progress} />
        </div>
        <div className="course-duration-content">
          <ul className="course-duration">
            <li>
              <i className="fa fa-clock-o"></i>
            </li>
            <li>
              {courseDate}
            </li>
            <li className="third-child">
              <button className="course-btn" onClick={handleClick}>
                {accessBtn} &nbsp;<i className="fa fa-angles-right"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default MyCourseCard;

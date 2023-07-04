import React, { useContext, useState } from "react";
import "./style.scss";
import { Row } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link, useNavigate } from "react-router-dom";
import imgLogo from "../../../assets/images/jslogo.png";
import UserContext from "../../../features/context/user/user";
import { getData } from "../../../adapters";
import { useEffect } from "react";
import {MyCourseCardType} from "../../../type/index";

function MyCourseCard(props: MyCourseCardType) {
  let accessBtn,
    courseDate = "";
  const currentTab = props.currentTab;
  const userCtx = useContext(UserContext);
  const userToken = userCtx.token;
  const navigate = useNavigate();
  const userId = userCtx.userInfo.userid;
  const [newstate, setNewstate] = useState(false);
  const [title, setTitle] = useState<any>();
  const courseid = props.mycoursedata.id;
  const resumeCourseKey = "crs-" + courseid + "-" + userId;

  if (currentTab === 1) {
    accessBtn = "Resume";
    if (props.mycoursedata.enddate === 0) courseDate = "";
    else {
      const finishDate = new Date(props.mycoursedata.enddate * 1000).toLocaleDateString("en-IN");
      courseDate = `End date: ${finishDate}`;
    }
  } else if (currentTab === 2) {
    accessBtn = "View";
    if (props.mycoursedata.enddate === 0) courseDate = "";
    else {
      const startDate = new Date(props.mycoursedata.enddate * 1000);
      courseDate = `End date: ${startDate.toLocaleDateString("en-IN")}`;
    }
  } else {
    accessBtn = "Yet to start";
    const startDate = new Date(props.mycoursedata.startdate * 1000);
    courseDate = `Start date: ${startDate.toLocaleDateString("en-IN")}`;
  }
  useEffect(
    () => {
      const query = {
        wsfunction: "core_course_get_contents",
        courseid
      };
      getData(query)
        .then(res => {
          if (res.status === 200 && res.data) {
            if (newstate === true) {
              let breakLoop = false;
              for (let data of res.data) {
                for (let val of data.modules) {
                  if (val.modname === "quiz") {
                    localStorage.setItem(resumeCourseKey, val.instance + "-" + val.modname);
                    navigate(`/mod/quiz/${courseid}/${val.instance}`, { state: { modname: val.name } });
                    breakLoop = true;
                    break;
                  } else if (val.modname === "resource") {
                    localStorage.setItem(resumeCourseKey, val.id + "-" + val.modname);
                    navigate(`/mod/video/${val.instance}/${courseid}`);
                    breakLoop = true;
                    break;
                  }
                }
                if (breakLoop === true) break;
              }
            } else {
              let arr: any[] = [];
              res.data.map((val: { modules: any[]; }) => {
                val.modules.map(modname => {
                  arr.push(modname);
                });
                setTitle(arr);
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    [newstate]
  );
  function handleClick() {
    let lastCourseStatus: any = localStorage.getItem(resumeCourseKey);
    if (lastCourseStatus === null) {
      setNewstate(true);
    } else {
      lastCourseStatus = lastCourseStatus.split("-");
      for (let data of title) {
        if (lastCourseStatus[1] === "quiz" && data.modname === "quiz") {
          if (lastCourseStatus[0] === data.instance) {
            navigate(`/mod/quiz/${courseid}/${lastCourseStatus[0]}`, { state: { modname: data.name } });
          }
        } else if (lastCourseStatus[1] === "resource" && data.modname === "resource") {
          if (lastCourseStatus[0] === data.id) {
            let videoUrl = data.contents[0].fileurl.replace("?forcedownload=1", "");
            data.contents !== undefined &&
              navigate(`/mod/video/${lastCourseStatus[0]}/${courseid}`, { state: { modurl: videoUrl, modname: data.name } });
          }
        }
      }
    }
  }
  return (
    <>
      <div className="ai-course">
        <Row>
          <div className="col-9">
            <h5 className="card-title">{props.mycoursedata.fullname.substr(0, 30)}</h5>
            <div className="card-desc mb-4">
              {props.mycoursedata.summary.replace(/(<([^>]+)>)/gi, "").substr(0, 70)}.....
            </div>
          </div>
          <div className="col-3">
              <Link to={`/courseview/${props.mycoursedata.id}/${props.mycoursedata.fullname}`}>
                {props.mycoursedata.overviewfiles.length !== 0 ? (
                  <img src={`${props.mycoursedata.overviewfiles[0].fileurl}?token=${userToken}`} className="course-image" alt={props.mycoursedata.fullname} />
                ) : (
                  <img src={imgLogo} className="course-image" alt={props.mycoursedata.fullname} />
                )}
              </Link>
          </div>
        </Row>
        
        <span className="progress-percentage">{props.mycoursedata.progress === null ? `0` : Math.round(props.mycoursedata.progress)}%</span>
        <span className="percentage-status">{props.mycoursedata.completed === false ? "Not completed" : "Completed"}</span>
        <ProgressBar now={props.mycoursedata.progress} />
        
        <div className="course-duration">
          <i className="fa-solid fa-clock"></i>
          <span>{courseDate}</span>
          <button className="course-btn" onClick={handleClick}>
            {accessBtn} &nbsp;<i className="fa-solid fa-angles-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}
export default MyCourseCard;

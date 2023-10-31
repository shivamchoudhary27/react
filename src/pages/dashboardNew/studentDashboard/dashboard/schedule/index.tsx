import "./style.scss";
import Mobile from "./view/mobile";
import Browser from "./view/browser";
import React, { useState, useEffect } from "react";
import { getData } from "../../../../../adapters";
import { isMobile, isDesktop } from "react-device-detect";

const ScheduleTable = () => {
  const currentDate = new Date();
  const id = localStorage.getItem("userid");
  const [apiStatus, setApiStatus] = useState("") 
  const [courseSession, setCourseSession] = useState([]);
  const sessionMode = ["", "offline", "online", "lab", "hybrid"];
  const timestamp = Math.floor(currentDate.getTime() / 1000);

  useEffect(() => {
    const query = {
      wsfunction: "mod_attendance_get_courses_with_today_sessions",
      userid: id,
      date: timestamp,
    };

    setApiStatus("started")
    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data !== "") {
          setCourseSession(res.data);
          setApiStatus("finished")
        }
      })
      .catch((err) => {
        console.log(err);
        setApiStatus("finished")
      });
  }, [id]);

  return (
    <React.Fragment>
      {isMobile ? (
        <Mobile
          courseSession={courseSession}
          sessionMode={sessionMode}
          apiStatus={apiStatus}
        />
      ) : isDesktop ? (
        <Browser
          courseSession={courseSession}
          sessionMode={sessionMode}
          apiStatus={apiStatus}
        />
      ) : (
        <Browser
          courseSession={courseSession}
          sessionMode={sessionMode}
          apiStatus={apiStatus}
        />
      )}
    </React.Fragment>
  );
};

export default ScheduleTable;

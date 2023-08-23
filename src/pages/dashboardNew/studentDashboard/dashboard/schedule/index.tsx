import React, { useState, useEffect } from "react";
import "./style.scss";
import { getData } from "../../../../adapters";
import Browser from "./view/browser";
import Mobile from "./view/mobile";
import { isMobile, isDesktop } from "react-device-detect";

const ScheduleTable = () => {
  const id = localStorage.getItem("userid");
  const [courseSession, setCourseSession] = useState([]);
  const sessionMode = ["", "offline", "online", "lab", "hybrid"];
  const timestamp = Math.floor(Date.now() / 1000);

  let currentDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const query = {
      wsfunction: "mod_attendance_get_courses_with_today_sessions",
      // id,
      userid: id,
      // date: 1686873600,
      date: timestamp,
    };

    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data !== "") {
          setCourseSession(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <React.Fragment>
      {isMobile ? (
        <Mobile
          currentDate={currentDate}
          courseSession={courseSession}
          sessionMode={sessionMode}
        />
      ) : isDesktop ? (
        <Browser
          currentDate={currentDate}
          courseSession={courseSession}
          sessionMode={sessionMode}
        />
      ) : (
        <Browser
          currentDate={currentDate}
          courseSession={courseSession}
          sessionMode={sessionMode}
        />
      )}
    </React.Fragment>
  );
};

export default ScheduleTable;

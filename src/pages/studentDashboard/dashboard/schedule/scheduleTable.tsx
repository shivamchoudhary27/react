import React, { useState, useEffect } from "react";
import "./style.scss";
import calendarIcon from "../../../../assets/images/icons/calendar-black.svg";
import { getData } from "../../../../adapters";
import Errordiv from "../../../../widgets/alert/errordiv";

const ScheduleTable = () => {
  const id = localStorage.getItem("userid");
  const [courseSession, setCourseSession] = useState([]);
  const sessionMode = ["", "offline", "online", "lab", "hybrid"];

  useEffect(() => {
    const query = {
      wsfunction: "mod_attendance_get_courses_with_today_sessions",
      // id,
      userid: id,
      date: 1686873600,
    };

    getData(query)
      .then((res) => {
        console.log(res);
        if (res.status === 200 && res.data !== "") {
          setCourseSession(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="mitblock-body">
        {courseSession.map((item: any, index) =>
          item.attendance_instances.map((el: any) =>
            el.today_sessions.map((val: any) => (
              <div
                className="d-flex align-items-center tsb-row mb-2"
                key={index}
              >
                <div className="align-self-start me-3">
                  <img src={calendarIcon} alt="Schedule Icon" />
                </div>
                <div className="tsb-info">
                  <h6>
                    {val.name.charAt(0).toUpperCase() + val.name.slice(1)}
                  </h6>
                  <p>{el.name}</p>
                  <span>{val.venue}</span>
                </div>
                <span className={`badge tsb-button ${sessionMode[val.mode]}`}>
                  {sessionMode[val.mode].charAt(0).toUpperCase() +
                    sessionMode[val.mode].slice(1)}
                </span>
              </div>
            ))
          )
        )}
        {courseSession.length === 0 && (
          <Errordiv msg="No session available!" cstate />
        )}
      </div>
    </>
  );
};

export default ScheduleTable;

const tableData = [
  {
    title: "Introduction to logic and Proofs",
    subtitle: "Discrete Mathmatical Structures, Venue name",
    time: "10:30 AM",
    btn: "Online",
    classname: "online",
  },
  {
    title: "Data structure Evolution",
    subtitle: "Data structure & Algorithms",
    time: "11:15 AM",
    btn: "Offline",
    classname: "offline",
  },
  {
    title: "Advantages of DBMS",
    subtitle: "Database management system",
    time: "12:00 PM",
    btn: "Lab",
    classname: "lab",
  },
  {
    title: "Structure and Function (Multicore Computer)",
    subtitle: "Computer Organization and Architecture, Venue name",
    time: "01:00 AM",
    btn: "Offline",
    classname: "offline",
  },
  {
    title: "CISC v/s RISC",
    subtitle: "Computer Organization and Architecture",
    time: "02:30 PM",
    btn: "Online",
    classname: "online",
  },
];

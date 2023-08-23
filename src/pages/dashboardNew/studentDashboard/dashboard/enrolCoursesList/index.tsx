import React, { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import Browser from "./view/browser";
import Mobile from "./view/mobile";
import { isMobile, isDesktop } from "react-device-detect";

const EnrolCoursesList = () => {
  const [coursesList, setCoursesList] = useState([]);
  const id = localStorage.getItem("userid");
  const url = `https://demo.learn.ballisticlearning.com/webservice/rest/server.php?wstoken=7243942b15e0ffe89c1cf7c432863232&wsfunction=core_enrol_get_users_courses &moodlewsrestformat=json&userid=${id}`;

  useEffect(() => {
    axios
      .get(url)
      .then((res: any) => {
        setCoursesList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <React.Fragment>
      {isMobile ? (
        <Mobile coursesList={coursesList} />
      ) : isDesktop ? (
        <Browser coursesList={coursesList} />
      ) : (
        <Browser coursesList={coursesList} />
      )}
    </React.Fragment>
  );
};

export default EnrolCoursesList;

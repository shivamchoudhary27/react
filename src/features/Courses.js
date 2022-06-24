import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getData } from "../adapters";
import CourseView from "./CourseView";

const Courses = () => {
  const userid = localStorage.getItem("userid");
  const wstoken = localStorage.getItem("token");

  const [course, setCourse] = useState();
  const [courseload, setCourseload] = useState(false);

  const query = {
    moodlewsrestformat: "json",
    wstoken: wstoken,
    wsfunction: "core_enrol_get_users_courses",
    userid: userid,
  };

  if (courseload == false) {
    getData(query)
      .then((res) => {
        console.log("mycourses response");
        console.log(res);
        if (res.status == 200 && res.data) {
          setCourse(res.data);
          setCourseload(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
    console.log("hello")
    console.log(course)
  return (
    <>
      <CourseView/>
    </>
  );
};

export default Courses;

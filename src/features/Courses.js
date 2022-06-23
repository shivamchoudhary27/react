import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getData } from "../adapters";

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
      <div className="text-center">
        <h1>Welcome to Course Page</h1>
        <Link to="/dashboard">Go back to dashboard</Link>
      </div>
    </>
  );
};

export default Courses;

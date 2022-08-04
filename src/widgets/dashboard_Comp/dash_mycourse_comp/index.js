import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import MyCourseCard from "./Cards";
import { getData } from "../../../adapters";
import "./style.scss";

const DashMyCourse = () => {
  //   const [show, setShow] = useState(true);
  const userid = localStorage.getItem("userid");
  const [myCourses, setMyCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const query = {
      wsfunction: "core_enrol_get_users_courses",
      userid: userid,
    };

    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data) {
          if (userid !== query.userid || res.data.errorcode) {
            setError("Something went wrong");
          } else {
            setMyCourses(res.data);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(myCourses);

  return (
    <>
      <div className="course-content">
        <Row className="course-row">
          {myCourses.map((element) => {
            return (
              <>
                <div className="col-sm-4">
                  <div className="">
                    <MyCourseCard mycoursedata={element} />
                  </div>
                </div>
              </>
            );
          })}
        </Row>
        <div className="text-center">
          <button className="more-course-btn">Load More</button>
        </div>
      </div>
    </>
  );
};

export default DashMyCourse;

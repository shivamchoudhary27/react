import React, { useState, useEffect } from "react";
import img from "../images/images.png";
import { Link } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { getData } from "../adapters";

const CardComp = (props) => {
  const userid = localStorage.getItem("userid");
  const wstoken = localStorage.getItem("token");
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    const query = {
      moodlewsrestformat: "json",
      wstoken: wstoken,
      wsfunction: "core_enrol_get_users_courses",
      userid: userid,
    };

    getData(query)
      .then((res) => {
        if (res.status == 200 && res.data) {
          setMyCourses(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {myCourses.map((course, index) => (
        <Container>
          <Row>
            <div className="col-xs-3 col-md-3 col-sm-12 col-12">
              <Link to={`/courseview/${course.id}/${course.fullname}`}>
                <div className="card">
                  <img src={img} className="card-img-top" alt="images" />
                  <div className="card-body">
                    <h5 className="card-title">{course.fullname}</h5>
                    <p className="card-text">
                      {course.summary.substr(0, 50)}
                      Some quick example text to build on the card title.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </Row>
        </Container>
      ))}
    </>
  );
};

export default CardComp;

import React, { useState, useEffect, useContext } from "react";
import { Row, Card } from "react-bootstrap";
import CardComp from "../components/CardComp";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import UserContext from "./context/user/user";
import { getData } from "../adapters";

const Mycourse = () => {
  const [show, setShow] = useState(true);
  const userid = localStorage.getItem("userid");
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    const query = {
      wsfunction: "core_enrol_get_users_courses",
      userid: userid,
    };

    getData(query)
      .then((res) => {
        if (res.status == 200 && res.data) {
          if ((userid != query.userid) || (res.data.errorcode)) {
            console.log("Something went wrong");
          }
          else {
            setMyCourses(res.data);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const showSide = () => {
    setShow(!show);
  };

  return (
    <>
      <main className={show ? "space-toggle" : null}>
        <Header toggleFun={showSide} currentState={show} />
        <Sidebar currentState={show} />
        <div className="container-fluid page-box">
          <div className="welcome-txt">
            <h5>
              Welcome back, {localStorage.getItem("name")}{" "}
              <i className="bi bi-hand-thumbs-up-fill"></i>
            </h5>
          </div>
          <Card>
            <Row className="px-4">
              <CardComp title="" mycoursedata={myCourses} />
            </Row>
          </Card>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Mycourse;

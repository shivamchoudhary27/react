import React, { useState, useEffect } from "react";
import { Row, Card } from "react-bootstrap";
import CardComp from "../components/CardComp";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { getData } from "../adapters";
import BreadCrumb from "../components/BreadCrumb";
import { Container } from "react-bootstrap";
import ErrorBox from "../components/ErrorBox";
const Mycourse = () => {
  const [show, setShow] = useState(true);
  const userid = localStorage.getItem("userid");
  const [myCourses, setMyCourses] = useState([]);
  const [error,setError] = useState("");

  useEffect(() => {
    const query = {
      wsfunction: "core_enrol_get_users_courses",
      userid: userid,
    };

    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data) {
          if ((userid !== query.userid) || (res.data.errorcode)) {
            // console.log("Something went wrong");
            setError("Something went wrong");
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
        <Container>
        <h2> {<ErrorBox msg={error} />} </h2>
        <div className="container-fluid page-box">
          <div className="card" id="height1">
            <div className="welcome-txt">
              <div className="card-title">
                <h5>
                  Welcome back, {localStorage.getItem("fullname")}{" "}
                  <i className="bi bi-hand-thumbs-up-fill"></i>
                </h5>
                <BreadCrumb
                  breadcrumbItem={[
                    ["Home", "/dashboard", true],
                    ["Course", "/mycourse", false],
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
        <Card>
          <Row className="px-4">
            <CardComp title="" mycoursedata={myCourses} />
          </Row>
        </Card>
        </Container>
        <Footer />
      </main>
    </>
  );
};

export default Mycourse;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Card } from "react-bootstrap";
import CardComp from "../components/CardComp";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [show, setShow] = useState(true);

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
              <i class="bi bi-hand-thumbs-up-fill"></i>
            </h5>
          </div>

          <Card>
            <Row className="px-4">
              <div className="col-md-3">
                <Link to="/courses">
                  <CardComp title="Courses" />
                </Link>
              </div>
              <div className="col-md-3">
                <CardComp title="Assignment" />
              </div>
              <div className="col-md-3">
                <CardComp title="Quiz" />
              </div>
              <div className="col-md-3">
                <CardComp title="Quiz" />
              </div>
            </Row>
          </Card>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Dashboard;

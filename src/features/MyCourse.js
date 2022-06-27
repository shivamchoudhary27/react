import React, { useState } from "react";
import { Row, Card } from "react-bootstrap";
import CardComp from "../components/CardComp";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Dashboard = (props) => {
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
              <CardComp title="" />
            </Row>
          </Card>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Dashboard;

import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Header from "../../header/";
import Sidebar from "../../sidebar/";
import Quiz from "../quiz";

const ActivityPage = () => {
  const [show, setShow] = useState(true);
  const showSide = () => {
    setShow(!show);
  };

  return (
    <>
      <main className={show ? "space-toggle" : null}>
        <Header toggleFun={showSide} currentState={show} />
        <Sidebar currentState={show} />
        <Container>
          <div className="container-fluid page-box">
            <h2>Welcome to activity page (in progress) !</h2>
          </div>
          <Quiz/>
        </Container>
      </main>
    </>
  );
};
export default ActivityPage;

import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";
import Sidebar from "./Sidebar";

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
            <h2>Welcome to activity page.</h2>
          </div>
        </Container>
      </main>
    </>
  );
};
export default ActivityPage;

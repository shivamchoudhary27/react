import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

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
          <div className="card" id="height1">
            <div className="card-body">
              <div className="card-title">
                <h2>{localStorage.getItem("fullname")}</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="/mycourse">Courses</Link>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div>
            <h3>Welcome to dashboard</h3>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Dashboard;

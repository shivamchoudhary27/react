import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import Footer from "./Footer";

const Dashboard = () => {
  const [show, setShow] = useState(true);

  return (
    <>
      <main className={show ? "space-toggle" : null}>
        <header className={`header ${show ? "space-toggle" : null}`}>
          <div className="header-toggle" onClick={() => setShow(!show)}>
            <i className="bi bi-list"></i>
          </div>

          <div className="header-avatar">
            <i className="bi bi-bell-fill">
              <sup>2</sup>
            </i>
            <i className="bi bi-chat-fill"></i>
            <i className="bi bi-person-circle"></i>
            <span>Admin</span>
            <i className="bi bi-caret-down-fill"></i>
          </div>
        </header>

        <aside className={` sidebar ${show ? "show" : null} `}>
          <nav className="nav">
            <div>
              <Link to="/" className="nav-logo">
                <i className="bi bi-house-fill nav-logo-icon"></i>
                <span className="nav-logo-name">Homepage</span>
              </Link>

              <div className={` sidebar ${show ? "show" : null} `}>
                <Link to="/dashboard" className="nav-link active">
                  <i className="bi bi-speedometer2 nav-link-icon"></i>
                  <span className="nav-link-name">Dashboard</span>
                </Link>
                <Link to="/course" className="nav-link">
                  <i className="bi bi-book nav-link-icon"></i>
                  <span className="nav-link-name">Course</span>
                </Link>
                <Link to="/assignment" className="nav-link">
                  <i className="bi bi-pen-fill nav-link-icon"></i>
                  <span className="nav-link-name">Assignment</span>
                </Link>
                <Link to="/quiz" className="nav-link">
                  <i className="bi bi-award-fill nav-link-icon"></i>
                  <span className="nav-link-name">Quiz</span>
                </Link>
                <Link to="/setting" className="nav-link">
                  <i className="bi bi-gear-fill nav-link-icon"></i>
                  <span className="nav-link-name">Setting</span>
                </Link>
              </div>
            </div>

            <Link to="/" className="nav-link">
              <i className="bi bi-power nav-link-icon"></i>
              <span className="nav-link-name">Logout</span>
            </Link>
          </nav>
        </aside>

        <div className="container-fluid page-box">
          <div className="row">
            <div className="col-lg-8">
              <div className="col">
                <Card title="Courses" />
                <Card title="Assignment" />
                <Card title="Quiz" />
              </div>
            </div>

            <div className="col-lg-4">
              <Card title="Courses" />
              <Card title="Courses" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Dashboard;

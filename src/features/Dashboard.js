import React, { useState } from "react";
import { Link } from "react-router-dom";
import useUserinfo from "./hooks/userinfo";
import PageLoader from "../components/loader/pageloader";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Dashboard = () => {
  const [show, setShow] = useState(true);
  const res = useUserinfo();

  if (res === "loading") {
    return <PageLoader />;
  }

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
                {/* <h2>{(userinfo.userInfo.customhook.sitename) ?? '--------'}</h2> */}
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
          {res.userInfo.status === 400 ? (
            <h3>{res.userInfo.userInfo.message}</h3>
          ) : (
            <h3>Welcome to dashboard</h3>
          )}
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Dashboard;

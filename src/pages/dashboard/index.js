import React, { useState } from "react";
import { Link } from "react-router-dom";
import useUserinfo from "../../features/hooks/userinfo";
import Header from "../header/";
import Sidebar from "../sidebar/";
// import Sidebar2 from "../sidebar2";
import Footer from "../footer";
import PageLoader from "../../widgets/loader/pageloader";
import BreadCrumb from "../../widgets/BreadCrumb";
import style from "./style.module.scss";

const Dashboard = () => {
  const [show, setShow] = useState(true);
  const res = useUserinfo();
  const [x, setX] = useState({i: 1, j: 'put some values'});

  if (res === "loading") {
    return <PageLoader />;
  }

  const showSide = () => {
    setShow(!show);
  };

  return (
    <>
      <main className={show ? style.spaceToggle : null}>
        <Header toggleFun={showSide} currentState={show} />
        <Sidebar currentState={show} />
        {/* <Sidebar2 /> */}

        <BreadCrumb title={localStorage.getItem("fullname")}
          breadcrumbItem={[
            ["Home", "/dashboard", true],
            ["Dashboard", "/dashboard", false],
          ]}
        />

        <div>
          {res.userInfo.status === 400 ? (
            <h3>{res.userInfo.userInfo.message}</h3>
          ) : (
            <h3>Welcome to dashboard</h3>
          )}
        </div>
        <button className="btn btn-warning">
          <Link to="/dashboard2">Dashboard2</Link>
        </button>
        <Footer />
      </main>
    </>
  );
};

export default Dashboard;

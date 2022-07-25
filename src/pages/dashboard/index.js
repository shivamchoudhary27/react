import React, { useState } from "react";
import useUserinfo from "../../features/hooks/userinfo";
import Header from "../header/";
import Sidebar from "../sidebar/";
import Footer from "../footer";
import PageLoader from "../../widgets/loader/pageloader";
import BreadCrumb from "../../widgets/BreadCrumb";

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
        <Footer />
      </main>
    </>
  );
};

export default Dashboard;

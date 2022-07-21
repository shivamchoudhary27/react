import React, { useState } from "react";
import useUserinfo from "../../features/hooks/userinfo";
import Header from "../../features/Header";
import Sidebar from "../../features/Sidebar";
import Footer from "../../features/Footer";
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
        <div className="container-fluid page-box">
          <div className="card" id="height1">
            <div className="card-body">
              <div className="card-title">
                <h2>{localStorage.getItem("fullname")}</h2>
                {/* <h2>{(userinfo.userInfo.customhook.sitename) ?? '--------'}</h2> */}
                <BreadCrumb
                  breadcrumbItem={[
                    ["Home", "/dashboard", true],
                    ["Dashboard", "/dashboard", false],
                  ]}
                />
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

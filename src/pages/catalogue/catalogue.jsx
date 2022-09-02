import React from "react";
import Header from "../header";
import Sidebar from "../sidebar";
import "./style.scss";
import DashCatalog from "../../widgets/dashboard_Comp/dash_catalog_comp";
// import SkeletonMimic from "./Skeleton";

const Catalogue = () => {
  return (
    <>
      <Sidebar />
      <Header />
      {/* <SkeletonMimic /> */}
      <DashCatalog />
    </>
  );
};

export default Catalogue;

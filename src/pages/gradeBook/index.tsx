import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../newHeader";
import HeaderTabs from "../headerTabs";
import Footer from "../newFooter";
import BreadcrumbComponent from "../../widgets/breadcrumb";
import PageTitle from "../../widgets/pageTitle";
import { Container } from "react-bootstrap";
import Filter from "./filters";
import GradeTable from "./table";
import axios from "axios";
// import { getData } from "../../adapters/microservices";
import { getData } from "../../adapters";

type Props = {};

const GradeBook = (props: Props) => {
  const dummyData = {tabledata: []}
  const [gradebookData, setGradebookData] = useState<any>(dummyData);
  const id = localStorage.getItem("userid");
  const [apiStatus, setApiStatus] = useState("");

  useEffect(() => {
    setApiStatus("started");
    const query = {
      wsfunction: "gradereport_user_get_grades_table",
      userid: id,
      courseid: 9,
    };
    getData(query).then((res) => {
      if(res.data !== "" && res.status === 200){
        setGradebookData(res.data.tables[0])
      }
    }).catch((err)=>{
      console.log(err)
    })
  }, []);

  // console.log(gradebookData)

  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="gradebook" />
      <BreadcrumbComponent routes={[{ name: "Gradebook", path: "" }]} />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle={`Gradebook`} gobacklink="" />
          <Filter />
          <GradeTable gradebookData={gradebookData.tabledata} apiStatus={apiStatus} />
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default GradeBook;

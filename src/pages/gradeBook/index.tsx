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
  const [coursesList, setCoursesList] = useState<any>([]);
  const id = localStorage.getItem("userid");
  const [apiStatus, setApiStatus] = useState("");
  const [courseId, setCourseId] = useState<any>('')

  useEffect(() => {
    setApiStatus("started");
    const query = {
      wsfunction: "gradereport_user_get_grades_table",
      userid: id,
      courseid: courseId == '' ? 21 : courseId, //coursesList.length > 0 && coursesList[0].id
    };
    getData(query).then((res) => {
      if(res.data !== "" && res.status === 200){
        setGradebookData(res.data.tables[0])
      }
    }).catch((err)=>{
      console.log(err)
    })
  }, [courseId]);

  useEffect(()=>{
    const query = {
      wsfunction: "core_enrol_get_users_courses",
      userid: id,
    };
    getData(query).then((res) => {
      if(res.data !== "" && res.status === 200){
        setCoursesList(res.data)
      }
    }).catch((err)=>{
      console.log(err)
    })
  }, [])

  const getCourseId = (courseId: string) => {
    setCourseId(courseId)
  }

  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="gradebook" />
      <BreadcrumbComponent routes={[{ name: "Gradebook", path: "" }]} />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle={`Gradebook`} gobacklink="" />
          <Filter coursesList={coursesList} getCourseId={getCourseId} />
          <GradeTable gradebookData={gradebookData.tabledata} apiStatus={apiStatus} />
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default GradeBook;

import React, { useState, useEffect } from "react";
import "./style.scss";
import { Container } from "react-bootstrap";
import config from "../../../utils/config";
import Header from "../../header";
import Sidebar from "../../sidebar";
import Filter from "./filter";
import DepartmentTable from "./departmentTable";
import DepartmentPagination from "./pagination";
import DepartmentModal from "./departmentModal";

const Departments = () => {
  const [departmentData, setDepartmentData] = useState<any>([]);
  const [modalShow, setModalShow] = useState(false);

  const myHeaders = new Headers({
    Accept: "*/*",
    Authorization: `Bearer ${config.OAUTH2_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });

  const apiCall = async () => {
    const res = await fetch(
      "http://40.114.33.183:8081/learning-service/api/v1/departments",
      {
        headers: myHeaders,
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setDepartmentData(result);
      })
      .catch((err) => {
        console.log(err);
      });
    return res;
  };

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <>
      <Header pageHeading="" welcomeIcon={false} />
      <Sidebar />
      <Container fluid>
        <div
          className="contents"
          style={{ paddingLeft: "270px", marginTop: "70px" }}
        >
          <div className="container-wrapper">
            <div className="site-heading">
              <h3>Departments</h3>
            </div>
          </div>
          <hr />
          <Filter setModalShow={setModalShow} />
          <DepartmentTable departmentData={departmentData} />
          <DepartmentPagination />
          <DepartmentModal show={modalShow} onHide={() => setModalShow(false)} />
        </div>
      </Container>
    </>
  );
};

export default Departments;
import React from "react";
import Header from "../../newHeader";
import HeaderTabs from "../../headerTabs";
import Footer from "../../newFooter";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import PageTitle from "../../../widgets/pageTitle";
import { Container } from "react-bootstrap";
import Filters from "./filters";
import GradeTable from "./allStudentTable";

type Props = {};

const TeacherGradebook = (props: Props) => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs />
      <BreadcrumbComponent routes={[{ name: "Gradebook", path: "" }]} />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle={`Gradebook`} gobacklink="" />
          <Filters />
          <GradeTable />
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default TeacherGradebook;

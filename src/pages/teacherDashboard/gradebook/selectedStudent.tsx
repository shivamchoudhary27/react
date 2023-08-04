import React from "react";
import Header from "../../newHeader";
import HeaderTabs from "../../headerTabs";
import Footer from "../../newFooter";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import PageTitle from "../../../widgets/pageTitle";
import { Container } from "react-bootstrap";
import Filters from "./filters";
import SelectedStudentTable from "./selectedStudentTable";

type Props = {};

const SelectedStudentGrade = (props: Props) => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs />
      <BreadcrumbComponent routes={[{ name: "Gradebook", path: "" }]} />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle={`Gradebook`} gobacklink="/teachergradebook" />
          <Filters />
          <SelectedStudentTable />
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default SelectedStudentGrade;

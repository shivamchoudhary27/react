import React from "react";
import AddProgramForm from "../../form";
import Header from "../../../../../newHeader";
import Footer from "../../../../../newFooter";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../../../headerTabs";
import PageTitle from "../../../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    instituteId: any;
    currentProgram: any;
  };
};

const Browser = (props: Props) => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Manage Program", path: "/manageprogram" },
          { name: "Add Program", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle
              pageTitle={
                props.commonProps.currentProgram.id == 0
                  ? "Add Program"
                  : "Update Program"
              }
              gobacklink="/manageprogram"
            />
            {props.commonProps.currentProgram.status === true && (
              <AddProgramForm
                initialformvalues={props.commonProps.currentProgram.data}
                programid={props.commonProps.currentProgram.id}
                instituteId={props.commonProps.instituteId}
              />
            )}
          </Container>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Browser;

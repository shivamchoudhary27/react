import React from "react";
import FormData from "../../form";
import { useNavigate } from "react-router-dom";
import Header from "../../../../../../../newHeader";
import Footer from "../../../../../../../newFooter";
import { Container, Button } from "react-bootstrap";
import HeaderTabs from "../../../../../../../headerTabs";
import PageTitle from "../../../../../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    userid: any;
    currentInstitute: any;
    initialValues: any;
  };
};

const Browser = (props: Props) => {

  return (
    <React.Fragment>
      <Header />
      <HeaderTabs />
      <BreadcrumbComponent
        routes={[
          { name: "User Profile", path: "/profile" },
          { name: "Edit Profile", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-3">
          <Container fluid>
            <PageTitle
              pageTitle="Edit Profile"
              gobacklink={`/userprofile/${props.commonProps.userid}`}
            />
            <FormData
              initialValues={props.commonProps.initialValues}
              currentInstitute={props.commonProps.currentInstitute}
            />
          </Container>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
};

export default Browser;

import React from "react";
import FormData from "../../form";
import { Container } from "react-bootstrap";
import PageTitle from "../../../../../../../../widgets/pageTitle";
import MobileFooter from "../../../../../../../newFooter/mobileFooter";
import MobileHeader from "../../../../../../../newHeader/mobileHeader";
import BreadcrumbComponent from "../../../../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    userid: any;
    initialValues: any;
    currentInstitute: any;
  };
};

const Mobile = (props: Props) => {

  return (
    <React.Fragment>
      <MobileHeader />
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

      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;

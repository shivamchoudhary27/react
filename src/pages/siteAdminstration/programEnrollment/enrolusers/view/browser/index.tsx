import React from "react";
import UserTable from "../../userTable";
import EnrolCourseFilter from "../../filter";
import Header from "../../../../../newHeader";
import Footer from "../../../../../newFooter";
import EnrolUserModal from "../../enrolUserModal";
import HeaderTabs from "../../../../../headerTabs";
import { Container, Button } from "react-bootstrap";
import BottomLeftWave from "../../../../../assets/images/background/bg-bottomleft.svg";

type Props = {
  commonProps: {
    modalShow: any;
    toggleModalShow: any;
    enrolUserHandler: any;
  };
};

const Browser = (props: Props) => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      {/* <BreadcrumbComponent
            routes={[
              { name: "Site Administration", path: "/siteadmin" },
              { name: "User Management", path: "/programenrollment" },
              { name: "Manage program Enrollment", path: "" },
            ]}
          /> */}
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-4 mb-5">
          <Container fluid>
            <EnrolCourseFilter
              togglemodalshow={props.commonProps.toggleModalShow}
            />
            <hr />
            <UserTable />
            <div className="text-end">
              <Button
                variant="primary"
                onClick={props.commonProps.enrolUserHandler}
              >
                Enroll
              </Button>
            </div>
            <EnrolUserModal
              show={props.commonProps.modalShow}
              togglemodalshow={props.commonProps.toggleModalShow}
              onHide={() => props.commonProps.toggleModalShow(false)}
            />
          </Container>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Browser;

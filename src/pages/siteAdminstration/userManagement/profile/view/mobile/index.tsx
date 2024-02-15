import React from "react";
import EditUserProfile from "../../modal";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import PageTitle from "../../../../../../widgets/pageTitle";
import MobileHeader from "../../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../../newFooter/mobileFooter";
import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";
import { useSelector } from "react-redux";

type Props = {
  commonProps: {
    user: any;
    userid: any;
    modalShow: any;
    timeSlotList: any;
    workloadList: any;
    editComponent: any;
    refreshToggle: any;
    toggleModalShow: any;
    currentInstitute: any;
    capitalizeFirstLetter: any;
    searchCountryNameById: any;
  };
};

const Mobile = (props: Props) => {
  const navigate = useNavigate();

  const authenticatedUserPermission = useSelector(
    (state: any) => state.authenticatedUser.permissions.menu
  );

  return (
    <React.Fragment>
      <MobileHeader />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "User Management", path: "/usermanagement" },
          { name: "User Profile", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle pageTitle="User Profile" gobacklink="/usermanagement" />
            <div className="user-profile-box">
              <div className="row">
                <div className="col-md-4 text-center">
                  <h3 className="mt-3">
                    {(
                      props.commonProps.user.userFirstName +
                      " " +
                      props.commonProps.user.userLastName
                    ).replace(/\b\w/g, (match) => match.toUpperCase())}
                  </h3>
                  <Button
                    disabled={!authenticatedUserPermission.profile.canEdit}
                    onClick={() =>
                      navigate(`/edituserprofile/${props.commonProps.userid}`)
                    }
                  >
                    Edit Profile
                  </Button>
                </div>

                <div className="col-md-8">
                  <ul className="profile-menu-data">
                    <li>
                      <label>First Name</label>
                      {props.commonProps.capitalizeFirstLetter(
                        props.commonProps.user.userFirstName
                      )}
                    </li>
                    <li>
                      <label>Last Name</label>
                      {props.commonProps.capitalizeFirstLetter(
                        props.commonProps.user.userLastName
                      )}
                    </li>
                    <li>
                      <label>Email</label>
                      {props.commonProps.user.userEmail !== null
                        ? props.commonProps.user.userEmail
                        : "--"}
                    </li>
                    <li>
                      <label>Mobile Number</label>
                      {props.commonProps.user.mobile !== null
                        ? props.commonProps.user.mobile
                        : "--"}
                    </li>
                    <li>
                      <label>Gender</label>
                      {props.commonProps.capitalizeFirstLetter(
                        props.commonProps.user.genderType
                      )}
                    </li>
                    <li>
                      <label>Date of Birth</label>
                      {props.commonProps.user.dateOfBirth !== null
                        ? props.commonProps.user.dateOfBirth
                        : "--"}
                    </li>
                    <li>
                      <label>Country</label>
                      {props.commonProps.searchCountryNameById(
                        props.commonProps.user.userCountry
                      )}
                    </li>
                    <li>
                      <label>Blood Group</label>
                      {props.commonProps.capitalizeFirstLetter(
                        props.commonProps.user.bloodGroup
                      )}
                    </li>
                    <li>
                      <label>Father Name</label>
                      {props.commonProps.capitalizeFirstLetter(
                        props.commonProps.user.fatherName
                      )}
                    </li>
                    <li>
                      <label>Mother Name</label>
                      {props.commonProps.capitalizeFirstLetter(
                        props.commonProps.user.motherName
                      )}
                    </li>
                    <li>
                      <label>Parents Mobile No</label>
                      {props.commonProps.user.parentsMobile !== null
                        ? props.commonProps.user.parentsMobile
                        : "--"}
                    </li>
                    <li>
                      <label>Parents Email Id</label>
                      {props.commonProps.user.parentEmail !== null
                        ? props.commonProps.user.parentEmail
                        : "--"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>

      <EditUserProfile
        userobj={props.commonProps.user}
        show={props.commonProps.modalShow}
        timeSlotList={props.commonProps.timeSlotList}
        editComponent={props.commonProps.editComponent}
        updateAddRefresh={props.commonProps.refreshToggle}
        togglemodalshow={props.commonProps.toggleModalShow}
        workloadList={props.commonProps.workloadList.items}
        currentInstitute={props.commonProps.currentInstitute}
        onHide={() => props.commonProps.toggleModalShow(false)}
      />
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;

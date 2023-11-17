import React from "react";
import EditUserProfile from "../../modal";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import HeaderTabs from "../../../../headerTabs";
import { Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import { searchCountryNameById } from "../../../../../globals/getCountry";
import DefaultProfileImage from "../../../../../assets/images/profile.png";
import editpicture from "../../../../../assets/images/icons/edit-action.svg";

type Props = {
  commonProps: {
    user: any;
    modalShow: any;
    timeSlotList: any;
    workloadList: any;
    editComponent: any;
    refreshToggle: any;
    toggleModalShow: any;
    currentUserRole: any;
    currentInstitute: any;
    capitalizeFirstLetter: any;
  };
};

const Browser = (props: Props) => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="" />
      <BreadcrumbComponent
        routes={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "User Profile", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle="User Profile" gobacklink="/dashboard" />
          <div className="user-profile-box">
            <div className="row">
              <div className="col-md-4 text-center">
                <div
                  className="user-picture"
                  onClick={() => props.commonProps.toggleModalShow("picture")}
                >
                  <img
                    src={
                      props.commonProps.user.files !== undefined &&
                      props.commonProps.user.files.length > 0
                        ? props.commonProps.user.files[0].url
                        : DefaultProfileImage
                    }
                    alt={
                      props.commonProps.user.files !== undefined &&
                      props.commonProps.user.files.length > 0
                        ? props.commonProps.user.files[0].originalFileName
                        : props.commonProps.user.userFirstName
                    }
                    className="userPix"
                  />
                  <span className="action-icons editPix">
                    <img src={editpicture} alt="edit" />
                  </span>
                </div>
                <h3 className="mt-3">
                  {(
                    props.commonProps.user.userFirstName +
                    " " +
                    props.commonProps.user.userLastName
                  ).replace(/\b\w/g, (match) => match.toUpperCase())}
                </h3>
                <Button onClick={() => navigate("/editprofile")}>
                  Edit Profile
                </Button>
                <div
                  className="mt-2 resetPassword"
                  onClick={() =>
                    props.commonProps.toggleModalShow("changePassword")
                  }
                >
                  <Link to="">Change Password</Link>
                </div>
                {props.commonProps.currentUserRole.shortName ===
                  "editingteacher" && (
                  <div
                    className="resetPassword"
                    onClick={() =>
                      props.commonProps.toggleModalShow("setPreferences")
                    }
                  >
                    <Link to="">Set Preferences</Link>
                  </div>
                )}
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
                    {props.commonProps.user.userEmail}
                  </li>
                  <li>
                    <label>Mobile Number</label>
                    {props.commonProps.user.mobile}
                  </li>
                  <li>
                    <label>Gender</label>
                    {props.commonProps.capitalizeFirstLetter(
                      props.commonProps.user.genderType
                    )}
                  </li>
                  <li>
                    <label>Date of Birth</label>
                    {props.commonProps.user.dateOfBirth}
                  </li>
                  <li>
                    <label>Country</label>
                    {searchCountryNameById(props.commonProps.user.userCountry)}
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
                    {props.commonProps.user.parentsMobile}
                  </li>
                  <li>
                    <label>Parents Email Id</label>
                    {props.commonProps.user.parentEmail}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
      <EditUserProfile
        userobj={props.commonProps.user}
        show={props.commonProps.modalShow}
        timeSlotList={props.commonProps.timeSlotList}
        editComponent={props.commonProps.editComponent}
        workloadList={props.commonProps.workloadList.items}
        currentInstitute={props.commonProps.currentInstitute}
        updateAddRefresh={props.commonProps.refreshToggle}
        togglemodalshow={props.commonProps.toggleModalShow}
        onHide={() => props.commonProps.toggleModalShow(false)}
      />
    </React.Fragment>
  );
};

export default Browser;

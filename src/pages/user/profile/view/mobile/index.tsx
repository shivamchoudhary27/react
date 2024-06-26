import React from "react";
import EditUserProfile from "../../modal";
import { Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../../../../widgets/pageTitle";
import MobileHeader from "../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../newFooter/mobileFooter";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import { searchCountryNameById } from "../../../../../globals/getCountry";
import DefaultProfileImage from "../../../../../assets/images/profile.png";
import editpicture from "../../../../../assets/images/icons/addimage.svg";
import "./mobileStyle.scss";
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
    profilePic: any;
  };
};

const Mobile = (props: Props) => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <MobileHeader />
      <BreadcrumbComponent
        routes={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "User Profile", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle pageTitle="User Profile" gobacklink="/dashboard" />
            <div className="user-profile-box">
            <div className="row">
              <div className="col-md-4 text-center">
             <div className="profileimage-wrapper"
                  onClick={() => props.commonProps.toggleModalShow("picture")}
             >
             <div
                  className="user-picture"
                >
                  <img
                    src={
                      props.commonProps.profilePic !== undefined &&
                      props.commonProps.profilePic.length > 0
                        ? props.commonProps.profilePic[0].url
                        : DefaultProfileImage
                    }
                    alt={
                      props.commonProps.profilePic !== undefined &&
                      props.commonProps.profilePic.length > 0
                        ? props.commonProps.profilePic[0].originalFileName
                        : props.commonProps.user.userFirstName
                    }
                    className="userPix"
                  />
                </div>
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
               <div className="profilebuttons">
               <Button onClick={() => navigate("/editprofile")}>
                  Edit Profile
                </Button>
                <Button
                  className="resetPassword"
                  onClick={() =>
                    props.commonProps.toggleModalShow("changePassword")
                  }
                >
                Change Password
                </Button>
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
                <ul className="profile-menu-data mt-4">
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
                      <label>Time Zone</label>
                      {props.commonProps.user.timezone !== null ?
                       props.commonProps.user.timezone : "Asia/Kolkata" }
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
      </div>
      <MobileFooter />
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

export default Mobile;

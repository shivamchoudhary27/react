import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import EditUserProfile from "./modal";
import { Button } from "react-bootstrap";
import HeaderTabs from "../../headerTabs";
import { Container } from "react-bootstrap";
import PageTitle from "../../../widgets/pageTitle";
import { Link, useNavigate } from "react-router-dom";
import { getData } from "../../../adapters/coreservices";
// import UserContext from "../../../features/context/user/user";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import React, { useEffect, useContext, useState } from "react";
import { searchCountryNameById } from "../../../globals/getCountry";
import { globalUserInfoActions } from "../../../store/slices/userInfo";
import { globalUserProfileActions } from "../../../store/slices/userProfile";
import DefaultProfileImage from "../../../assets/images/profile.png";
import editpicture from "../../../assets/images/icons/edit-action.svg";

const UserProfile = () => {
  const [user, setUser] = useState({
    userFirstName: "--",
    userLastName: "--",
    userEmail: "--",
    userId: 0,
    userCountry: "--",
    enabled: false,
    fatherName: "--",
    motherName: "--",
    parentEmail: "--",
    bloodGroup: "--",
    genderType: "--",
    dateOfBirth: "--",
    roles: [],
    files: [],
    mobile: '--',
    parentsMobile: '--',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [refreshData, setRefreshData] = useState(true);
  const [editComponent, setEditComponent] = useState("changePassword");
  const userProfileInfo = useSelector(
    (state: any) => state.userProfile.userProfile
  );
  const currentUserInfo = useSelector((state: any) => state.userInfo.userInfo);

  console.log(userProfileInfo, currentUserInfo);

  useEffect(() => {
    setUser(userProfileInfo);
    getData(`/user/profile`, {})
      .then((result: any) => {
        if (result.status === 200) {
          setUser(result.data);
          const updateCurrentUserInfo = {
            authorities: currentUserInfo.authorities,
            email: currentUserInfo.email,
            first_name: currentUserInfo.first_name,
            institutes: currentUserInfo.institutes,
            last_name: currentUserInfo.last_name,
            roles: currentUserInfo.roles,
            username: currentUserInfo.username,
            uid: currentUserInfo.uid,
            files: result.data.files,
          }
          dispatch(globalUserInfoActions.updateUserPicture(result.data.files));
          dispatch(globalUserProfileActions.userProfile(result.data));
          localStorage.setItem('userProfile', JSON.stringify({userProfile: result.data}))
          localStorage.setItem('userInfo', JSON.stringify({userInfo: updateCurrentUserInfo}))
        }
      })
      .catch((err: any) => {
        console.log(err);
        setUser((previous) => ({...previous, userId: currentUserInfo.uid}));
      });
  }, [refreshData]);

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (component: string) => {
    setModalShow(!modalShow);
    setEditComponent(component);
  };

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  const capitalizeFirstLetter = (inputString: string) => {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="" />
      <BreadcrumbComponent routes={[{ name: "Profile", path: "" }]} />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle="" gobacklink="" />
          <div className="user-profile-box">
            <div className="row">
              <div className="col-md-4 text-center">
                <div 
                  className="user-picture"
                  onClick={() => toggleModalShow("picture")}
                >
                  <img
                    src={user.files !== undefined && user.files.length > 0 ? user.files[0].url : DefaultProfileImage}
                    alt={
                      user.files !== undefined &&
                      user.files.length > 0
                        ? user.files[0].originalFileName
                        : user.userFirstName
                    }
                    className="userPix"
                  />
                  <span className="action-icons editPix">
                    <img src={editpicture} alt="edit" />
                  </span>
                </div>
                <h3 className="mt-3">
                  {(user.userFirstName + " " + user.userLastName).replace(
                    /\b\w/g,
                    (match) => match.toUpperCase()
                  )}
                </h3>
                <Button onClick={() => navigate('/editprofile')}>
                  Edit Profile
                </Button>
                <div className="mt-2 resetPassword" onClick={() => toggleModalShow("changePassword")}>
                  <Link to="">Change Password</Link>
                </div>
              </div>

              <div className="col-md-8">
                <ul className="profile-menu-data">
                  <li>
                    <label>First Name</label>
                    {capitalizeFirstLetter(user.userFirstName)}
                  </li>
                  <li>
                    <label>Last Name</label>
                    {capitalizeFirstLetter(user.userLastName)}
                  </li>
                  <li>
                    <label>Email</label>
                    {user.userEmail}
                  </li>
                  <li>
                    <label>Mobile Number</label>
                    {user.mobile}
                  </li>
                  <li>
                    <label>Gender</label>
                    {capitalizeFirstLetter(user.genderType)}
                  </li>
                  <li>
                    <label>Date of Birth</label>
                    {user.dateOfBirth}
                  </li>
                  <li>
                    <label>Country</label>
                    {searchCountryNameById(user.userCountry)}
                  </li>
                  <li>
                    <label>Blood Group</label>
                    {capitalizeFirstLetter(user.bloodGroup)}
                  </li>
                  <li>
                    <label>Father Name</label>
                    {capitalizeFirstLetter(user.fatherName)}
                  </li>
                  <li>
                    <label>Mother Name</label>
                    {capitalizeFirstLetter(user.motherName)}
                  </li>
                  <li>
                    <label>Parents Mobile No</label>
                    {user.parentsMobile}
                  </li>
                  <li>
                    <label>Parents Email Id</label>
                    {user.parentEmail}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
      <EditUserProfile
        show={modalShow}
        onHide={() => toggleModalShow(false)}
        userobj={user}
        togglemodalshow={toggleModalShow}
        updateAddRefresh={refreshToggle}
        editComponent={editComponent}
      />
    </React.Fragment>
  );
};

export default UserProfile;

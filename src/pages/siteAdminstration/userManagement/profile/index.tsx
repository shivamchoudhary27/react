import "./style.scss";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import EditUserProfile from "./modal";
import { Button } from "react-bootstrap";
import HeaderTabs from "../../../headerTabs";
import { Container } from "react-bootstrap";
import PageTitle from "../../../../widgets/pageTitle";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../../adapters/coreservices";
import { pagination } from "../../../../utils/pagination";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";
import React, { useEffect, useContext, useState } from "react";
// import UserContext from "../../../../features/context/user/user";
import { getData as get } from "../../../../adapters/microservices";
import { searchCountryNameById } from "../../../../globals/getCountry";
import DefaultProfileImage from "../../../../assets/images/profile.png";
import editpicture from "../../../../assets/images/icons/edit-action.svg";
import { globalUserInfoActions } from "../../../../store/slices/userInfo";
import { globalUserProfileActions } from "../../../../store/slices/userProfile";

const ViewUserProfile = () => {
  const [user, setUser] = useState({
    roles: [],
    files: [],
    userId: 0,
    mobile: "--",
    enabled: false,
    userEmail: "--",
    bloodGroup: "--",
    genderType: "--",
    fatherName: "--",
    motherName: "--",
    userCountry: "--",
    parentEmail: "--",
    dateOfBirth: "--",
    userLastName: "--",
    userFirstName: "--",
    parentsMobile: "--",
  });
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userid } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [refreshData, setRefreshData] = useState(true);
  const [timeSlotList, setTimeSlotList] = useState<any>([]);
  const [workloadList, setWorkloadList] = useState(dummyData);
  const [editComponent, setEditComponent] = useState("changePassword");

  const userProfileInfo = useSelector(
    (state: any) => state.userProfile.userProfile
  );
  const currentUserInfo = useSelector((state: any) => state.userInfo.userInfo);
  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );
  const currentUserRole = useSelector(
    (state: any) => state.globalFilters.currentUserRole
  );
  const [filterUpdate, setFilterUpdate] = useState({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
    userId: userid,
  });

  useEffect(() => {
    if (currentInstitute > 0) {
      getData(`/${currentInstitute}/users`, filterUpdate)
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            setUser(result.data.items[0]);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, []);

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (component: string) => {
    setModalShow(!modalShow);
    setEditComponent(component);
  };

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  const capitalizeFirstLetter = (inputString: string) => {
    if (inputString === null || inputString === '--') {
      return "--";
    } else {
      return inputString.charAt(0).toUpperCase() + inputString.slice(1);
    }
  };

  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="" />
      <BreadcrumbComponent routes={[{ name: "Profile", path: "" }]} />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle="" gobacklink="/usermanagement" />
          <div className="user-profile-box">
            <div className="row">
              <div className="col-md-4 text-center">
                <h3 className="mt-3">
                  {(user.userFirstName + " " + user.userLastName).replace(
                    /\b\w/g,
                    (match) => match.toUpperCase()
                  )}
                </h3>
                <Button 
                  onClick={() => navigate(`/edituserprofile/${userid}`)}
                >
                  Edit Profile
                </Button>
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
                    {(user.userEmail !== null) ? user.userEmail : "--"}
                  </li>
                  <li>
                    <label>Mobile Number</label>
                    {(user.mobile !== null) ? user.mobile : "--"}
                  </li>
                  <li>
                    <label>Gender</label>
                    {capitalizeFirstLetter(user.genderType)}
                  </li>
                  <li>
                    <label>Date of Birth</label>
                    {(user.dateOfBirth !== null) ? user.dateOfBirth : "--"}
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
                    {(user.parentsMobile !== null) ? user.parentsMobile : "--"}
                  </li>
                  <li>
                    <label>Parents Email Id</label>
                    {(user.parentEmail !== null) ? user.parentEmail : "--"}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
      <EditUserProfile
        userobj={user}
        show={modalShow}
        timeSlotList={timeSlotList}
        editComponent={editComponent}
        workloadList={workloadList.items}
        currentInstitute={currentInstitute}
        updateAddRefresh={refreshToggle}
        togglemodalshow={toggleModalShow}
        onHide={() => toggleModalShow(false)}
      />
    </React.Fragment>
  );
};

export default ViewUserProfile;

import "./style.scss";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import EditUserProfile from "./modal";
import { Button } from "react-bootstrap";
import HeaderTabs from "../../headerTabs";
import { Container } from "react-bootstrap";
import PageTitle from "../../../widgets/pageTitle";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../adapters/coreservices";
import { pagination } from "../../../utils/pagination";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import React, { useEffect, useContext, useState } from "react";
// import UserContext from "../../../features/context/user/user";
import { getData as get } from "../../../adapters/microservices";
import { searchCountryNameById } from "../../../globals/getCountry";
import DefaultProfileImage from "../../../assets/images/profile.png";
import editpicture from "../../../assets/images/icons/edit-action.svg";
import { globalUserInfoActions } from "../../../store/slices/userInfo";
import { globalUserProfileActions } from "../../../store/slices/userProfile";

const UserProfile = () => {
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
    userId: currentUserInfo.uid,
  });

  // console.log(userProfileInfo, currentUserInfo);

  useEffect(() => {
    setUser(userProfileInfo);
    getData(`/user/profile`, {})
      .then((result: any) => {
        if (result.status === 200) {
          setUser(result.data);
          const updateCurrentUserInfo = {
            uid: currentUserInfo.uid,
            files: result.data.files,
            roles: currentUserInfo.roles,
            email: currentUserInfo.email,
            username: currentUserInfo.username,
            last_name: currentUserInfo.last_name,
            first_name: currentUserInfo.first_name,
            institutes: currentUserInfo.institutes,
            authorities: currentUserInfo.authorities,
          };
          dispatch(globalUserInfoActions.updateUserPicture(result.data.files));
          dispatch(globalUserProfileActions.userProfile(result.data));
          localStorage.setItem(
            "userProfile",
            JSON.stringify({ userProfile: result.data })
          );
          localStorage.setItem(
            "userInfo",
            JSON.stringify({ userInfo: updateCurrentUserInfo })
          );
        }
      })
      .catch((err: any) => {
        console.log(err);
        setUser((previous) => ({ ...previous, userId: currentUserInfo.uid }));
      });
  }, [refreshData]);

  // get workload data === >>>
  useEffect(() => {
    let endPoint = `/${currentInstitute}/timetable/userworkload`;
    if (currentInstitute > 0) {
      get(endPoint, filterUpdate)
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            setWorkloadList(result.data);
          }
          // setApiStatus("finished");
        })
        .catch((err: any) => {
          console.log(err);
          // setApiStatus("finished");
        });
    }
  }, [currentInstitute]);

  useEffect(() => {
    workloadList.items.map((item: any) => {
      if (currentInstitute > 0) {
        let endPoint = `/${currentInstitute}/timetable/timeslot?departmentId=${item.departmentId}`;
        get(endPoint, filterUpdate)
          .then((result: any) => {
            if (result.data !== "" && result.status === 200) {
              let newItem = result.data.items;
              let filterItem = newItem.filter(
                (slotList: any) => slotList.departmentId === item.departmentId
              );
              let filterObj = {};
              filterObj["dpt_" + item.departmentId] = filterItem;
              setTimeSlotList((prevArray: any) => [...prevArray, filterObj]);
            }
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
    });
  }, [workloadList]);

  // console.log(timeSlotList)

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (component: string) => {
    setModalShow(!modalShow);
    setEditComponent(component);
  };

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  const capitalizeFirstLetter = (inputString: string) => {
    if (inputString !== null) {
      return inputString.charAt(0).toUpperCase() + inputString.slice(1);
    } else {
      return '--';
    }
  };

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
                  onClick={() => toggleModalShow("picture")}
                >
                  <img
                    src={
                      user.files !== undefined && user.files.length > 0
                        ? user.files[0].url
                        : DefaultProfileImage
                    }
                    alt={
                      user.files !== undefined && user.files.length > 0
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
                <Button onClick={() => navigate("/editprofile")}>
                  Edit Profile
                </Button>
                <div
                  className="mt-2 resetPassword"
                  onClick={() => toggleModalShow("changePassword")}
                >
                  <Link to="">Change Password</Link>
                </div>
                {currentUserRole.shortName === "editingteacher" && (
                  <div
                    className="resetPassword"
                    onClick={() => toggleModalShow("setPreferences")}
                  >
                    <Link to="">Set Preferences</Link>
                  </div>
                )}
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

export default UserProfile;

import "./style.scss";
import { pagination } from "../../../utils/pagination";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../adapters/coreservices";
import { postData } from "../../../adapters/microservices";
import React, { useEffect, useState } from "react";
// import UserContext from "../../../features/context/user/user";
import { getData as get } from "../../../adapters/microservices";
import { globalUserInfoActions } from "../../../store/slices/userInfo";
import { globalUserProfileActions } from "../../../store/slices/userProfile";

import View from "./view";

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
    timezone: "--"
  });
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [refreshData, setRefreshData] = useState(true);
  const [timeSlotList, setTimeSlotList] = useState<any>([]);
  const [workloadList, setWorkloadList] = useState(dummyData);
  const [editComponent, setEditComponent] = useState("changePassword");
  const [filesIds, setFilesIds] = useState([]);
  const [profilePic, setProfilePic] = useState([]);

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

  useEffect(() => {
    if(currentUserInfo.uid !== 0){
      setUser(userProfileInfo);
      getData(`/user/profile/${currentUserInfo.uid}`, {})
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
          if(result.data.files.length === 0){
            setProfilePic([])
          }
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
    }
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

  // ============================================================
  //                  Get Files data from local
  // ============================================================
  useEffect(() => {
    try {
      // const storedData = JSON.parse(localStorage.getItem("userInfo"));
      if (currentUserInfo.files && currentUserInfo.files.length > 0) {
        currentUserInfo.files.forEach((fileId: any) => {
          setFilesIds([{ id: fileId.id }]);
        });
      }
    } catch (error) {
      console.error("Error parsing userInfo:", error);
    }
  }, [currentUserInfo.files])

  useEffect(() => {
    if(filesIds.length > 0){
      postData(`/files`, filesIds)
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            setProfilePic(result.data)
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [filesIds])
  // ============================================================
  //                            End
  // ============================================================

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
      return "--";
    }
  };

  return (
    <React.Fragment>
      <View
        user={user}
        modalShow={modalShow}
        profilePic={profilePic}
        timeSlotList={timeSlotList}
        workloadList={workloadList}
        editComponent={editComponent}
        currentUserRole={currentUserRole}
        currentInstitute={currentInstitute}
        refreshToggle={refreshToggle}
        toggleModalShow={toggleModalShow}
        capitalizeFirstLetter={capitalizeFirstLetter}
      />
    </React.Fragment>
  );
};

export default UserProfile;

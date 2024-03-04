import "./style.scss";
import View from "./view";
import { useDispatch, useSelector } from "react-redux";
import { pagination } from "../../../../utils/pagination";
import { getData } from "../../../../adapters/coreservices";
import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import UserContext from "../../../../features/context/user/user";
import { searchCountryNameById } from "../../../../globals/getCountry";

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
      getData(`/user/profile/${userid}`, {})
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            setUser(result.data);
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
    if (inputString === null || inputString === "--") {
      return "--";
    } else {
      return inputString.charAt(0).toUpperCase() + inputString.slice(1);
    }
  };

  return (
    <React.Fragment>
      <View
        user={user}
        userid={userid}
        modalShow={modalShow}
        timeSlotList={timeSlotList}
        editComponent={editComponent}
        workloadList={workloadList.items}
        currentInstitute={currentInstitute}
        refreshToggle={refreshToggle}
        toggleModalShow={toggleModalShow}
        capitalizeFirstLetter={capitalizeFirstLetter}
        searchCountryNameById={searchCountryNameById}
      />
    </React.Fragment>
  );
};

export default ViewUserProfile;

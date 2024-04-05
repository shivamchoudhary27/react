import "./style.scss";
import View from "./view";
import ManageFilter from "./filters";
import { useSelector } from "react-redux";
import DiciplineTable from "./enroltable";
import DiciplineModal from "./enrolmodal";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { pagination } from "../../../../utils/pagination";
import EnglishLetterFilter from "../../../../widgets/filters/alphabets";
import { makeGetDataRequest } from "../../../../features/apiCalls/getdata";
import { FaBookOpenReader } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa6";
import "./style.scss";
import { Tooltip } from "react-tooltip";

const CourseEnrollment = () => {
  const navigate = useNavigate();
  const { programid, name, courseid, coursename } = useParams();
  const parsedCourseid = parseInt(courseid);
  const dummyData = {
    items: [],
    userRoles: {},
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [modalShow, setModalShow] = useState(false);
  const [uploadModalShow, setUploadModalShow] = useState(false);
  const [finalTableData, setFinalTableData] = useState([]);
  const [programData, setProgramData] = useState({
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  });
  // const [programUsers, setProgramUsers] = useState({ items: [], pager: { totalElements: 0, totalPages: 0 } });
  const [programName, setProgramName] = useState("");
  const [diciplineData, setDiciplineData] = useState<any>(dummyData);
  const [disciplineObj, setDisciplineObj] = useState({
    userId: 0,
    userEmail: "",
    groups: [],
    sendmail: false
  });
  const [refreshData, setRefreshData] = useState(true);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
    teachersOnly: false,
  });
  const [apiStatus, setApiStatus] = useState("");
  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );

  // get programs API call === >>>
  useEffect(() => {
    makeGetDataRequest(
      `/course/${parsedCourseid}/enrol-user`,
      filterUpdate,
      setDiciplineData,
      setApiStatus
    );
    // makeGetDataRequest(
    //   `${currentInstitute}/programs`,
    //   { pageNumber: 0, pageSize: pagination.PERPAGE, Id: programid },
    //   setProgramData,
    //   setApiStatus
    // );
  }, [refreshData, filterUpdate]);

  useEffect(() => {
    if (programData.items.length === 1) {
      setProgramName(programData.items[0].name);
    }
  }, [programData]);

  useEffect(() => {
    const updatedItems = diciplineData.items.map((item: any) => {
      const role = diciplineData.userRoles[item.userEmail];
      if (role) {
        return { ...item, userRole: role };
      } else {
        return { ...item, userRole: "" };
      }
    });
    setFinalTableData(updatedItems);
    // setDiciplineData({...diciplineData, items : updatedItems})
  }, [diciplineData]);

  // API call on delete === >>
  useEffect(() => {
    if (refreshOnDelete === true)
      makeGetDataRequest(
        `/course/${parsedCourseid}/enrol-user`,
        filterUpdate,
        setDiciplineData,
        setApiStatus
      );
  }, [refreshOnDelete]);

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  const refreshOnDeleteToggle = (value: boolean) => {
    setRefreshOnDelete(value);
  };

  // get id, name from discipline table === >>>
  const editHandlerById = ({ userId, userEmail, groups, sendmail }: any) => {
    setDisciplineObj({ userId: userId, userEmail: userEmail, groups: groups, sendmail: sendmail });
  };

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  // handle to open Add Discipline modal === >>>
  const openAddDiscipline = () => {
    toggleModalShow(true);
    setDisciplineObj({ userId: 0, userEmail: "", groups: [] });
    setRefreshData(false);
  };

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  const toggleUploadModal = () => {
    setUploadModalShow(true);
  };

  //  for show additional  infotmation on the table
  const EnrolledUser = diciplineData.pager.totalElements
  const enrollmentCapacity = diciplineData.courseDetails !== undefined && diciplineData.courseDetails.enrollmentCapacity
  const remainingSeats = diciplineData.courseDetails !== undefined && diciplineData.courseDetails.remainingSeats



  const updateInputFilters = (inputvalues: any) => {
    if (inputvalues.userEmail !== "") {
      setFilterUpdate({
        ...filterUpdate,
        firstNameStart: inputvalues.firstNameStart,
        userEmail: inputvalues.userEmail,
        pageNumber: 0,
      });
    } else {
      let updatedState = { ...filterUpdate, pageNumber: 0 };
      updatedState.firstNameStart = inputvalues.firstNameStart;
      if (updatedState.userEmail) delete updatedState.userEmail;
      setFilterUpdate(updatedState);
    }
  };

  // <<< ===== JSX CUSTOM COMPONENTS ===== >>>
  const DISCIPLINE_TABLE_COMPONENT = (
    <DiciplineTable
      diciplineData={finalTableData}
      editHandlerById={editHandlerById}
      toggleModalShow={toggleModalShow}
      refreshDisciplineData={refreshToggle}
      refreshOnDelete={refreshOnDeleteToggle}
      courseid={parsedCourseid}
      userroles={diciplineData.userRoles}
      apiStatus={apiStatus}
    />
  );

  const DISCIPLINE_MODAL_COMPONENT = (
    <DiciplineModal
      show={modalShow}
      onHide={() => setModalShow(false)}
      togglemodalshow={toggleModalShow}
      disciplineobj={disciplineObj}
      refreshDisciplineData={refreshToggle}
      courseid={parsedCourseid}
    />
  );

  const updateSearchFilters = (newFilterRequest: any, reset = false) => {
    if (reset === true) {
      let updatedState = { ...filterUpdate, pageNumber: 0 };
      delete updatedState.name;
      delete updatedState.email;
      setFilterUpdate(updatedState);
      return false;
    } else {
      const { name, email } = newFilterRequest;
      let updatedState = {
        ...filterUpdate,
        pageNumber: 0,
        ...newFilterRequest,
      };

      if (email === "") delete updatedState.email;
      if (name === "") delete updatedState.name;

      setFilterUpdate(updatedState);
    }
  };

  const addAlphabetFirstNameFilter = (letter: string) => {
    setFilterUpdate({ ...filterUpdate, firstNameStart: letter });
  };

  const addAlphabetLastNameFilter = (letter: string) => {
    setFilterUpdate({ ...filterUpdate, lastNameStart: letter });
  };

  const DISCIPLINE_BUTTONS = (
    <>
      <div className="site-button-group mb-3">
        <Link to="" className="action-icons small-icon"
          onClick={() =>
            navigate(
              `/managegroups/${programid}/${name}/${courseid}/${coursename}`
            )
          }

        >
          Manage Groups
        </Link>{" "}

       
          <Link to="" className={`action-icons small-icon ${remainingSeats !== 0
            ? ""
            : "disabled my-anchor-element"
            }`} onClick={remainingSeats !== 0 && openAddDiscipline}>
            Enrol User
          </Link>{" "}

        <Link to=""
          className={`action-icons small-icon ${remainingSeats !== 0
            ? ""
            : "disabled my-anchor-element"
            }`} onClick={remainingSeats !== 0 && toggleUploadModal}>
          Upload Users
        </Link>
        {" "}
      </div>
      <div className="">
        <label htmlFor="First Name" className="m-2">First Name</label>
        <EnglishLetterFilter getalphabet={addAlphabetFirstNameFilter} />
        <div className="p-1"></div>
        <label htmlFor="Last Name" className="m-2">Last Name</label>
        <EnglishLetterFilter getalphabet={addAlphabetLastNameFilter} />
      </div>
      <div className="filter-wrapper mt-2">
        <ManageFilter
          updateinputfilters={updateSearchFilters}
          apiStatus={apiStatus}
        />
      </div>
            <Tooltip
                    anchorSelect=".my-anchor-element"
                    style={{ backgroundColor: "rgba(0,0,0,0.7)", borderRadius: "5px" }}
                    content="Seating Capacity is full"
                    place="top"
                  />
            
      <div>
        <div className="d-flex justify-content-end gap-5 pt-3 userscapacity">
          <div> <FaBookOpenReader />
            Enrolled user: {EnrolledUser}</div>
          {enrollmentCapacity !== null && remainingSeats !== null && (
            <>
              <div><FaUsers />
                Seating Capacity for Student: {enrollmentCapacity}</div>
              <div><FaUserClock />
                Remaining Seats for Student: {remainingSeats}</div>
            </>
          )}

        </div>
      </div>
    </>
  );
  // <<< ==== END COMPONENTS ==== >>>

  return (
    <View
      name={name}
      courseid={courseid}
      programid={programid}
      coursename={coursename}
      newPageRequest={newPageRequest}
      uploadModalShow={uploadModalShow}
      refreshToggle={refreshToggle}
      openAddDiscipline={openAddDiscipline}
      filterUpdate={filterUpdate.pageNumber}
      setUploadModalShow={setUploadModalShow}
      DISCIPLINE_BUTTONS={DISCIPLINE_BUTTONS}
      totalPages={diciplineData.pager.totalPages}
      DISCIPLINE_TABLE_COMPONENT={DISCIPLINE_TABLE_COMPONENT}
      DISCIPLINE_MODAL_COMPONENT={DISCIPLINE_MODAL_COMPONENT}
      remainingSeats={remainingSeats}
    />
  );
};

export default CourseEnrollment;


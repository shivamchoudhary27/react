import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { makeGetDataRequest } from "../../../../features/api_calls/getdata";
import { pagination } from "../../../../utils/pagination";
import { Container, Button } from "react-bootstrap";
import Header from "../../../header";
import Sidebar from "../../../sidebar";
import DiciplineTable from "./enroltable";
import DiciplineModal from "./enrolmodal";
import BuildPagination from "../../../../widgets/pagination";
import ManageFilter from "./filters";
import EnglishLetterFilter from "../../../../widgets/filters/alphabets";
import "./style.scss";

const CourseEnrollment = () => {
  const navigate = useNavigate();
  const { programid, courseid, coursename } = useParams();
  const parsedCourseid = parseInt(courseid);
  const dummyData = { items: [], userRoles : {}, pager: { totalElements: 0, totalPages: 0 } };
  const [modalShow, setModalShow] = useState(false);
  const [finalTableData, setFinalTableData] = useState([]);
  const [programData, setProgramData] = useState({ items: [], pager: { totalElements: 0, totalPages: 0 } });
  // const [programUsers, setProgramUsers] = useState({ items: [], pager: { totalElements: 0, totalPages: 0 } });
  const [programName, setProgramName] = useState('');
  const [diciplineData, setDiciplineData] = useState<any>(dummyData);
  const [disciplineObj, setDisciplineObj] = useState({
    name: "",
    description: "",
  });
  const [refreshData, setRefreshData] = useState(true);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });

  // get programs API call === >>>
  useEffect(() => {
    makeGetDataRequest(`/course/${parsedCourseid}/enrol-user`, filterUpdate, setDiciplineData);
    makeGetDataRequest('/programs', {pageNumber: 0, pageSize: pagination.PERPAGE, Id: programid}, setProgramData);
    // makeGetDataRequest(`program/${programid}/enrol-user`, filterUpdate, setProgramUsers); 
  }, [refreshData, filterUpdate]);

  useEffect(() => {
    if (programData.items.length === 1) {
      setProgramName(programData.items[0].name);
    }

  }, [programData]);

  useEffect(() => {
    const updatedItems = diciplineData.items.map((item : any) => {
      const role = diciplineData.userRoles[item.userEmail];
      if (role) {
        return { ...item, userRole: role };
      }
      return item;
    });
    setFinalTableData(updatedItems);
    // setDiciplineData({...diciplineData, items : updatedItems})
  }, [diciplineData]);

  useEffect(() => {
    if (refreshOnDelete === true)
      makeGetDataRequest(`/course/${parsedCourseid}/enrol-user`, filterUpdate, setDiciplineData);
  }, [refreshOnDelete]);

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  const refreshOnDeleteToggle = (value: boolean) => {
    setRefreshOnDelete(value);
  };

  // get id, name from discipline table === >>>
  const editHandlerById = ({ id, name, description }: any) => {
    setDisciplineObj({ id: id, name: name, description: description });
  };

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  // handle to open Add Discipline modal === >>>
  const openAddDiscipline = () => {
    toggleModalShow(true);
    setDisciplineObj({ id: 0, name: "", description: "" });
    setRefreshData(false);
  };

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  const updateInputFilters = (inputvalues : any) => {
    if (inputvalues.userEmail !== '') {
      setFilterUpdate({...filterUpdate, firstNameStart: inputvalues.firstNameStart, userEmail: inputvalues.userEmail, pageNumber: 0})
    } else {
      let updatedState = {...filterUpdate, pageNumber: 0};
      updatedState.firstNameStart = inputvalues.firstNameStart;
      if (updatedState.userEmail) delete updatedState.userEmail;
      setFilterUpdate(updatedState);
    }
  }

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

  const updateSearchFilters = (newFilterRequest: any, reset = false ) => {
    if (reset === true) {
      const { name, email, ...newObject } = newFilterRequest;
      setFilterUpdate({...filterUpdate, ...newObject});
    } else {
      const { name, email } = newFilterRequest;
      let updatedState = {...filterUpdate, pageNumber: 0, ...newFilterRequest};

      if (email === "") delete updatedState.email;
      if (name === "") delete updatedState.name;

      setFilterUpdate(updatedState);
    }
  }

  const addAlphabetFirstNameFilter = (letter : string) => {
    setFilterUpdate({ ...filterUpdate, firstNameStart: letter });
  }

  const addAlphabetLastNameFilter = (letter : string) => {
    setFilterUpdate({ ...filterUpdate, lastNameStart: letter });
  }

  const DISCIPLINE_BUTTONS = (
    <div className="filter-wrapper">
      <ManageFilter updateinputfilters={updateSearchFilters}/>
      FirstName
      <EnglishLetterFilter getalphabet={addAlphabetFirstNameFilter}/>
      <br />
      LastName
      <EnglishLetterFilter getalphabet={addAlphabetLastNameFilter}/>
      <div className="mt-2">
        <Button variant="primary" onClick={openAddDiscipline}>
          Enrol User
        </Button>{" "}
        <Button
          variant="outline-secondary"
          onClick={() => navigate(`/enrolusers/${programid}/${programName}`)}
        >
          Go back
        </Button>
      </div>
    </div>
  );
  // <<< ==== END COMPONENTS ==== >>>

  return (
    <>
      <Header pageHeading={`Course Enrollment: ${coursename}`} welcomeIcon={false} />
      <div className="main-content-container">
        <Sidebar />
        <div
          className="content-area content-area-slider"
          id="contentareaslider"
        >
          <Container fluid className="administration-wrapper">
            {DISCIPLINE_BUTTONS}
            {DISCIPLINE_TABLE_COMPONENT}
            <BuildPagination
              totalpages={diciplineData.pager.totalPages}
              activepage={filterUpdate.pageNumber}
              getrequestedpage={newPageRequest}
            />
            <Button variant="primary" onClick={openAddDiscipline}>
              Enrol User
            </Button>{" "}
            {DISCIPLINE_MODAL_COMPONENT}
          </Container>
        </div>
      </div>
    </>
  );
};

export default CourseEnrollment;

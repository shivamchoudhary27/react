import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getData } from "../../../../../adapters/microservices";
import UserWaitlistTable from "./userWaitlistTable";
import Header from "../../../../newHeader";
import HeaderTabs from "../../../../headerTabs";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import PageTitle from "../../../../../widgets/pageTitle";
import UserFilter from "./filters";
import ManageFilter from "./filters";
import { pagination } from "../../../../../utils/pagination";

const UserWaitlist = () => {
  const navigate = useNavigate();
  const { id, courseid ,name, programid,  } = useParams();
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [apiStatus, setApiStatus] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [refreshData, setRefreshData] = useState(true);
  const [minorCourseData, setMinorCourseData] = useState<any>(dummyData);

  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
    // pageSize: 100,
  });


  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );
  // Get minorCourses Data from API === >>
  useEffect(() => {
    setApiStatus(true);
    getData(`/${currentInstitute}/view_waitlist?courseId=${courseid}`, filterUpdate)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          setMinorCourseData(result.data);
        }
        setApiStatus(false);
      })
      .catch((err: any) => {
        console.log(err);
        setApiStatus(false);
      });
  }, [currentInstitute, filterUpdate, refreshData]);

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

 

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




  return (
    <>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Programs Enrollment", path: "/programenrollment" },
          { name: "Computer Science", path: `/enrolusers/${programid}/${name}` },
          { name: "View Wait List", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle
              pageTitle="Wait List"
            gobacklink={`/enrolusers/${programid}/${name}`}
            />
            <ManageFilter
             apiStatus={apiStatus}
            updateInputFilters={updateSearchFilters}/>
            <UserWaitlistTable
              apiStatus={apiStatus}
              toggleModalShow={toggleModalShow}
              minorCourseData={minorCourseData}
            />
          </Container>
        </div>
      </div>
    </>
  );
};

export default UserWaitlist;

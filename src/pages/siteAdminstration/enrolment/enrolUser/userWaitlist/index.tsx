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
import ModalForm from "./ModalForm";
import { number } from "yup";
import Footer from "../../../../newFooter";
import { BackgroundWaveBottomLeft } from "../../../../../widgets/backgroundElements";

const UserWaitlist = () => {
  const navigate = useNavigate();
  const { id ,name, programid,courseid, coursename  } = useParams();
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [apiStatus, setApiStatus] = useState("started");
  const [modalShow, setModalShow] = useState(false);
  const [minorCourseData, setMinorCourseData] = useState<any>(dummyData);
  const [refreshData, setRefreshData] = useState(true);
  const [UserModalInfo, setUserModalInfo] = useState({
    userId: number,
    courseId: number,
    fullName: "", 
    email:""
  });

  
  // const EnrolledUser= diciplineData.pager.totalElements
  // const enrollmentCapacity= diciplineData.courseDetails !== undefined && diciplineData.courseDetails.enrollmentCapacity
  // const remainingSeats= diciplineData.courseDetails !== undefined && diciplineData.courseDetails.remainingSeats

  


  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
    // pageSize: 100,
  });

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );
  // Get minorCourses Data from API === >>
  useEffect(() => {
    setApiStatus("started");
    getData(`/${currentInstitute}/view_waitlist?courseId=${courseid}`, filterUpdate)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          setMinorCourseData(result.data);
        }
        setApiStatus("finished");
      })
      .catch((err: any) => {
        console.log(err);
        setApiStatus("finished");
      });
    }, [currentInstitute, filterUpdate,refreshData]);

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  const getUserModalInfo = (userId: number, courseId: number, firstName: string, lastName: string, email:string)=> {
    const fullName = `${firstName.charAt(0).toUpperCase()}${firstName.slice(1)} ${lastName.charAt(0).toUpperCase()}${lastName.slice(1)}`;
    
    setUserModalInfo({
        userId: userId,
        courseId: courseId,
        fullName: fullName,
        email: email,
    });
  }
  useEffect(() => {
    
}, [UserModalInfo]);
  
 

  const updateSearchFilters = (newFilterRequest: any, reset = false) => {
    if (reset === true) {
      let updatedState = { ...filterUpdate};
      delete updatedState.name;
      delete updatedState.email;
      setFilterUpdate(updatedState);
      return false;
    } else {
      const { name, email } = newFilterRequest;
      let updatedState = {
        ...filterUpdate,
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
          { name: `${name}`, path: `/enrolusers/${programid}/${name}` },
          { name: `${coursename}`, path: `/enrolusers/${programid}/${name}`},
          { name: "View Wait List", path: "" },
        ]}
      />

      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle
              pageTitle={`${coursename} : Wait List`}
            gobacklink={`/enrolusers/${programid}/${name}`}
            />
            <ManageFilter
             apiStatus={apiStatus}
            updateInputFilters={updateSearchFilters}/>
            {/* <div>
            <Row>
      <Col>Enrolled user: {EnrolledUser}</Col>
           {enrollmentCapacity !== null && remainingSeats !== null && (
            <>
              <Col>Seating Capacity: {enrollmentCapacity}</Col>
              <Col>Remaining Seats: {remainingSeats}</Col>
            </>
          )}
          </Row>
            </div> */}
            <UserWaitlistTable
              apiStatus={apiStatus}
              toggleModalShow={toggleModalShow}
              minorCourseData={minorCourseData}
              getUserModalInfo = {getUserModalInfo}
            />
            <ModalForm
             toggleModalShow={toggleModalShow}
             updateAddRefresh={refreshToggle}
             modalShow={modalShow}
             onHide={() => toggleModalShow(false)}
             UserModalInfo = {UserModalInfo}
             />
          </Container>
        </div>
      </div>
        <Footer/>
      <BackgroundWaveBottomLeft/>
    </>
  );
};

export default UserWaitlist;

import View from "./view";
import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { pagination } from "../../../utils/pagination";
import { makeGetDataRequest } from "../../../features/apiCalls/getdata";

const ProgramEnrollment = () => {
  const dummyData = { items: [], pager: { totalElements: 0, totalPages: 0 } };
  const [refreshData, setRefreshData] = useState<boolean>(true);
  const [enrollmentData, setEnrollmentData] = useState<any>(dummyData);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    departmentId: "",
    name: "",
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
    // published: true
  });
  const [apiStatus, setApiStatus] = useState("");
  const currentInstitute = useSelector(state => state.globalFilters.currentInstitute);
  console.log('debug testing-- one more update -- new var set -x-x');
  // get programs API call === >>>
  useEffect(() => {
    if (currentInstitute > 0)
    makeGetDataRequest(`/${currentInstitute}/programs`, filterUpdate, setEnrollmentData, setApiStatus);
  }, [refreshData, filterUpdate, currentInstitute]);

  // to update filters values in the main state filterUpdate
  const updateDepartmentFilter = (departmentId: string) => {
    console.log('updateing department filter ', departmentId)
    setFilterUpdate({ 
      ...filterUpdate,
      departmentId: departmentId,
      pageNumber: 0,
    });
  };
const updateInputFilters = (inputvalues: any) => {
    if (inputvalues.reset !== undefined) {
      console.log('reseting all input filters', inputvalues);

      let updatedState = { ...filterUpdate, pageNumber: 0 };
      delete updatedState.name;
      delete updatedState.programCode;
      delete updatedState.departmentId;
      setFilterUpdate(updatedState);
      return false;   
    }
    if (inputvalues.code !== "") {
      console.log('program code in not empty', inputvalues);
      setFilterUpdate({
        ...filterUpdate,
        name: inputvalues.name,
        programCode: inputvalues.code,
        pageNumber: 0,
      });
    } else {
      console.log('program code delete', inputvalues)

      let updatedState = { ...filterUpdate, pageNumber: 0 };
      updatedState.name = inputvalues.name;
      if (updatedState.programCode) delete updatedState.programCode;
      setFilterUpdate(updatedState);
    }
  };

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  return (
    <View 
     apiStatus={apiStatus}
     filterUpdate={filterUpdate}
     newPageRequest={newPageRequest}
     currentInstitute={currentInstitute}
     enrollmentData={enrollmentData.items}
     updateinputfilters={updateInputFilters}
     updateDepartment={updateDepartmentFilter}
     totalpages={enrollmentData.pager.totalPages}
    />
 )
};
export default ProgramEnrollment;
 
      {/* <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Program Enrollment", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle="Program Enrollment" gobacklink="/siteadmin" />
          <ProgramEnrollFilter
            apiStatus={apiStatus}
            updateDepartment={updateDepartmentFilter}
            updateinputfilters={updateInputFilters}
            currentInstitute={currentInstitute}
          />
          <ProgramEnrollTable enrollmentData={enrollmentData.items} apiStatus={apiStatus} />

          
              <BuildPagination
                totalpages={enrollmentData.pager.totalPages}
                activepage={filterUpdate.pageNumber}
                getrequestedpage={newPageRequest}
              />
            
          
        </Container>
      </div>
      <Footer />
      <div className="bottomLeftWave">
        <img src={BottomLeftWave} alt="bottom wave" />
      </div>
    </> */}
 

import "./style.scss";
import Filters from "./filters";
import WorkLoadModal from "./form";
import WorkLoadTable from "./table";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../headerTabs";
import PageTitle from "../../../../widgets/pageTitle";
import { pagination } from "../../../../utils/pagination";
import BuildPagination from "../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";
import { getData, putData } from "../../../../adapters/microservices";
import { makeGetDataRequest } from "../../../../features/apiCalls/getdata";

const WorkLoad = () => {
  const dummyData = {
    default_workload: 0,
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [workLoadApiResponseData, setWorkLoadApiResponseData] =
    useState(dummyData);
  const [departmentList, setDepartmentList] = useState(dummyData);
  const [refreshOnDelete, setRefreshOnDelete] = useState(false);
  const [classroomObj, setClassroomObj] = useState({});
  const [refreshData, setRefreshData] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [apiStatus, setApiStatus] = useState("");
  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );
  const [filterUpdate, setFilterUpdate] = useState({
    name: "",
    email: "",
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });

  useEffect(() => {
    if (currentInstitute > 0) {
      const endPoint = `/${currentInstitute}/departments`;
      getData(endPoint, filterUpdate).then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setDepartmentList(res.data);
        }
      });
    }
  }, [currentInstitute]);

  useEffect(() => {
    let endPoint = `/${currentInstitute}/timetable/userworkload`;
    if (currentInstitute > 0) {
      getData(endPoint, filterUpdate)
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            for (const key in result.data.items) {
              const value = result.data.items[key];
              if (
                value.workLoad === 0 &&
                workLoadApiResponseData.default_workload > 0
              ) {
                value.workLoad = workLoadApiResponseData.default_workload;
                // renderFacultyDefaultWorkLoadValue(value.userId, value.workLoad);
              }
            }
            setWorkLoadApiResponseData(result.data);
          }
          setApiStatus("finished");
        })
        .catch((err: any) => {
          console.log(err);
          setApiStatus("finished");
        });
      }
  }, [refreshData, filterUpdate, currentInstitute]);

  console.log("workLoadApiResponseData---", workLoadApiResponseData)

  // function renderFacultyDefaultWorkLoadValue(id: any, val: any) {
  //   let endPoint = `/${currentInstitute}/timetable/userworkload/${id}`;
  //   putData(endPoint, {workLoad: val}).then((res: any) => {});
  // }


  // API call on delete === >>>
  useEffect(() => {
    if (currentInstitute > 0) {
      let endPoint = `/${currentInstitute}/timetable/userworkload`;
      makeGetDataRequest(endPoint, filterUpdate, setWorkLoadApiResponseData);
    }
  }, [refreshOnDelete]);

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  const refreshOnDeleteToggle = (value: boolean) => {
    setRefreshOnDelete(value);
  };

  // to update filters values in the main state filterUpdate
  const updateClassroomFilterByDepartment = (departmentId: string) => {
    setFilterUpdate({
      ...filterUpdate,
      pageNumber: 0,
    });
  };

  const updateInputFilters = (inputvalues: any, inputEmail: any) => {
    setFilterUpdate({ ...filterUpdate, name: inputvalues, email: inputEmail, pageNumber: 0 });
  };

  // get userid from the work load table === >>>
  const editHandlerById = ({
    id,
    workLoad,
    userFirstName,
    userLastName,
    userEmail,
  }: any) => {
    setClassroomObj({
      id: id,
      workLoad: workLoad,
      userFirstName: userFirstName,
      userLastName: userLastName,
      userEmail: userEmail,
    });
  };

  // handle reset Form after SAVE data === >>>
  const resetClassroomForm = () => {
    setClassroomObj({
      id: 0,
      workLoad: 0,
      userFirstName: "",
      userLastName: "",
      userEmail: "",
    });
    setRefreshData(false);
  };

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  const filterHandlerByDepartment = (val: string) => {
    console.log(val);
  };

  const WORKLOAD_TABLE_COMPONENT = (
    <WorkLoadTable
      apiStatus={apiStatus}
      currentInstitute={currentInstitute}
      workLoadData={workLoadApiResponseData.items}
      workLoadApiResponseData={workLoadApiResponseData}
      editHandlerById={editHandlerById}
      toggleModalShow={toggleModalShow}
      refreshClassroomData={refreshToggle}
      refreshOnDelete={refreshOnDeleteToggle}
    />
  );

  const WORKLOAD_MODAL_COMPONENT = (
    <WorkLoadModal
      show={modalShow}
      workLoadObj={classroomObj}
      filterUpdate={filterUpdate}
      currentInstitute={currentInstitute}
      departmentList={departmentList.items}
      workLoadApiResponseData={workLoadApiResponseData}
      togglemodalshow={toggleModalShow}
      refreshClassroomData={refreshToggle}
      onHide={() => toggleModalShow(false)}
    />
  );
  // <<< ==== END COMPONENTS ==== >>>
  return (
    <>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Timetable Management", path: "/timetable" },
          { name: "Faculty Work Load", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle="Faculty Work Load" gobacklink="/timetable" />
          <Filters
            toggleModalShow={toggleModalShow}
            refreshClassroomData={refreshToggle}
            updateInputFilters={updateInputFilters}
            resetClassroomForm={resetClassroomForm}
            filterHandlerByDepartment={filterHandlerByDepartment}
            updateClassroomFilter={updateClassroomFilterByDepartment}
          />
          {WORKLOAD_TABLE_COMPONENT}
          <BuildPagination
            totalpages={workLoadApiResponseData.pager.totalPages}
            activepage={filterUpdate.pageNumber}
            getrequestedpage={newPageRequest}
          />
          {WORKLOAD_MODAL_COMPONENT}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default WorkLoad;

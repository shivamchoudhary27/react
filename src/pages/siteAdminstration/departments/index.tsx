import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
// import { makeGetDataRequest } from "../../../features/api_calls/getdata";
import { getData } from "../../../adapters/microservices";
import { Container } from "react-bootstrap";
import { pagination } from "../../../utils/pagination";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import DepartmentTable from "./table";
import DepartmentModal from "./form";
import BuildPagination from "../../../widgets/pagination";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import PageTitle from "../../../widgets/pageTitle";
import "./style.scss";
import Filters from "./filters";

const Departments = () => {
  const dummyData = { items: [], pager: { totalElements: 0, totalPages: 0 } };
  const [departmentData, setDepartmentData] = useState<any>(dummyData);
  const [modalShow, setModalShow] = useState(false);
  const [departmentObj, setDepartmentObj] = useState({});
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [refreshData, setRefreshData] = useState(true);
  const [apiStatus, setApiStatus] = useState("");
  const [filterUpdate, setFilterUpdate] = useState<any>({
    departmentId: "",
    name: "",
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  const currentInstitute = useSelector((state : any) => state.currentInstitute);

  const getDepartmentData = (endPoint : string, filters : any, setData : any, setApiStatus?:any) => {
    setApiStatus("started")
    getData(endPoint, filters)
    .then((result : any) => {
        if (result.data !== "" && result.status === 200) {
            // Merge the programCounts into the items objects
            result.data.items.forEach((item : any) => {
              const index = result.data.programCounts.findIndex((packet : any) => packet.departmentId === item.id);
              if (index > -1) {
                item.totalPrograms = result.data.programCounts[index].totalPrograms;
              }
            });
            setData(result.data);
        }
        setApiStatus("finished")
    })
    .catch((err : any) => {
        console.log(err);
        setApiStatus("finished")
    });
  }

  useEffect(() => {
    if (refreshOnDelete === true && currentInstitute > 0)
    getDepartmentData(
        `/${currentInstitute}/departments`,
        filterUpdate,
        setDepartmentData,
        setApiStatus
      );
  }, [refreshOnDelete]);

  // get programs API call === >>>
  useEffect(() => {
    if (currentInstitute > 0)
    getDepartmentData(
      `/${currentInstitute}/departments`,
      filterUpdate,
      setDepartmentData,
      setApiStatus
    );
  }, [refreshData, filterUpdate, currentInstitute]);

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  const refreshOnDeleteToggle = (value: boolean) => {
    setRefreshOnDelete(value);
  };

  const updateInputFilters = (inputvalues: any) => {
    setFilterUpdate({ ...filterUpdate, name: inputvalues, pageNumber: 0 });
  };

  // get id, name from the department table === >>>
  const editHandlerById = ({ id, name, published }: any) => {
    setDepartmentObj({ id: id, name: name, published: published });
  };

  // handle reset Form after SAVE data === >>>
  const resetDepartmentForm = () => {
    setDepartmentObj({ id: 0, name: "", published: false });
    setRefreshData(false);
  };

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  const DEPARTMENT_TABLE_COMPONENT = (
    <DepartmentTable
      departmentData={departmentData.items}
      editHandlerById={editHandlerById}
      toggleModalShow={toggleModalShow}
      refreshDepartmentData={refreshToggle}
      refreshOnDelete={refreshOnDeleteToggle}
      apiStatus={apiStatus}
      currentInstitute={currentInstitute}
    />
  );

  const DEPARTMENT_MODAL_COMPONENT = (
    <DepartmentModal
      show={modalShow}
      onHide={() => toggleModalShow(false)}
      departmentobj={departmentObj}
      togglemodalshow={toggleModalShow}
      refreshdepartmentdata={refreshToggle}
      currentInstitute={currentInstitute}
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
          { name: "Manage Program", path: "/manageprogram" },
          { name: "Department", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3">
        <Container fluid>
          <PageTitle pageTitle={`Department`} gobacklink="/manageprogram" />          
          <Filters
            toggleModalShow={toggleModalShow}
            refreshDepartmentData={refreshToggle}
            setDepartmentData={setDepartmentData}
            updateInputFilters={updateInputFilters} 
            resetDepartmentForm={resetDepartmentForm}
            // updateDepartment={updateDepartmentFilter}
            // updateinputfilters={updateInputFilters}
            // updateCurrentInstitute={updateCurrentInstitute}
          />
          {DEPARTMENT_TABLE_COMPONENT}
          <BuildPagination
            totalpages={departmentData.pager.totalPages}
            activepage={filterUpdate.pageNumber}
            getrequestedpage={newPageRequest}
          />
          {DEPARTMENT_MODAL_COMPONENT}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Departments;

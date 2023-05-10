import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeGetDataRequest } from "../../../features/api_calls/getdata";
import { pagination } from "../../../utils/pagination";
import { Container, Button } from "react-bootstrap";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
// import Sidebar from "../../sidebar";
import DiciplineTable from "./diciplineTable";
import DiciplineModal from "./diciplineModal";
import BuildPagination from "../../../widgets/pagination";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import "./style.scss";

const Discipline = () => {
  const navigate = useNavigate();
  const dummyData = { items: [], pager: { totalElements: 0, totalPages: 0 } };
  const [modalShow, setModalShow] = useState(false);
  const [diciplineData, setDiciplineData] = useState<any>(dummyData);
  const [disciplineObj, setDisciplineObj] = useState({
    name: "",
    description: "",
  });
  const [refreshData, setRefreshData] = useState(true);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    departmentId: "",
    name: "",
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });

  // get programs API call === >>>
  useEffect(() => {
    makeGetDataRequest("/disciplines", filterUpdate, setDiciplineData);
  }, [refreshData, filterUpdate]);

  useEffect(() => {
    if (refreshOnDelete === true)
      makeGetDataRequest("/disciplines", filterUpdate, setDiciplineData);
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

  // <<< ===== JSX CUSTOM COMPONENTS ===== >>>
  const DISCIPLINE_TABLE_COMPONENT = (
    <DiciplineTable
      diciplineData={diciplineData.items}
      editHandlerById={editHandlerById}
      toggleModalShow={toggleModalShow}
      refreshDisciplineData={refreshToggle}
      refreshOnDelete={refreshOnDeleteToggle}
    />
  );

  const DISCIPLINE_MODAL_COMPONENT = (
    <DiciplineModal
      show={modalShow}
      onHide={() => setModalShow(false)}
      togglemodalshow={toggleModalShow}
      disciplineobj={disciplineObj}
      refreshDisciplineData={refreshToggle}
    />
  );

  const DISCIPLINE_BUTTONS = (
    <div className="filter-wrapper">
      <div className="filter-form">
        <form>
          <div className="row g-3 align-items-center">
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                // onChange={(e) => setSearchValue(e.target.value)}
                // value={searchValue}
              />
            </div>
            <div className="col-auto">
              <Button variant="outline-secondary">Filter</Button>{" "}
              <Button
                variant="outline-secondary"
                // onClick={() => resetHandler()}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="mt-2">
        <Button variant="primary" onClick={openAddDiscipline}>
          Add Discipline
        </Button>{" "}
        <Button
          variant="outline-secondary"
          onClick={() => navigate("/manageprogram")}
        >
          Go back
        </Button>
      </div>
    </div>
  );
  // <<< ==== END COMPONENTS ==== >>>

  return (
    <>
      <Header />
      <HeaderTabs />
      <div className="contentarea-wrapper mt-3">
          <Container fluid className="administration-box">
          <BreadcrumbComponent
            routes={[
              { name: "Site Administration", path: "/siteadmin" },
              { name: "User Management", path: "/manageprogram" },
              { name: "Discipline", path: "" },
            ]}
          />
            {DISCIPLINE_BUTTONS}
            {DISCIPLINE_TABLE_COMPONENT}
            <BuildPagination
              totalpages={diciplineData.pager.totalPages}
              activepage={filterUpdate.pageNumber}
              getrequestedpage={newPageRequest}
            />
            {DISCIPLINE_MODAL_COMPONENT}
          </Container>
        </div>
      <Footer />
    </>
  );
};

export default Discipline;

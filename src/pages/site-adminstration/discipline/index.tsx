import React, { useState, useEffect } from "react";
import { makeGetDataRequest } from "../../../features/api_calls/getdata";
import { Container, Button } from "react-bootstrap";
import Header from "../../header";
import Sidebar from "../../sidebar";
import DiciplineTable from "./diciplineTable";
import DiciplineModal from "./diciplineModal";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../../widgets/pagination";
import "./style.scss";

const Discipline = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [diciplineData, setDiciplineData] = useState<any>([]);
  const [disciplineObj, setDisciplineObj] = useState({});
  const [refreshData, setRefreshData] = useState(true);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    departmentId: "",
    name: "",
    pageNumber: 0,
    pageSize: 20,
  });

  // get programs API call === >>>
  useEffect(() => {
    makeGetDataRequest("/disciplines", filterUpdate, setDiciplineData);
  }, [refreshData, filterUpdate]);

  const refreshToggle = () => {
    setRefreshData(!refreshData);
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
      diciplineData={diciplineData}
      editHandlerById={editHandlerById}
      toggleModalShow={toggleModalShow}
      refreshDisciplineData={refreshToggle}
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
    <div>
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
  );
  // <<< ==== END COMPONENTS ==== >>>

  return (
    <>
      <Header pageHeading="Discipline" welcomeIcon={false} />
      <div className="main-content-container">
        <Sidebar />
        <div
          className="content-area content-area-slider"
          id="contentareaslider"
        >
          <Container fluid className="administration-wrapper">
            {DISCIPLINE_BUTTONS}
            {DISCIPLINE_TABLE_COMPONENT}
            <CustomPagination
              totalpages={5}
              activepage={filterUpdate.pageNumber}
              getrequestedpage={newPageRequest}
            />
            {DISCIPLINE_MODAL_COMPONENT}
          </Container>
        </div>
      </div>
    </>
  );
};

export default Discipline;

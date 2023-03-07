import React, { useState, useEffect } from "react";
import { getData as getDiciplinesData } from "../../../adapters/microservices";
import { Container, Button } from "react-bootstrap";
import Header from "../../header";
import Sidebar from "../../sidebar";
import DiciplineTable from "./diciplineTable";
import DiciplineModal from "./diciplineModal";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const Discipline = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [diciplineData, setDiciplineData] = useState<any>([]);
  const [disciplineObj, setDisciplineObj] = useState({});
  const [refreshData, setRefreshData] = useState(true);

  // discipline API call === >>>
  useEffect(() => {
    if (refreshData === true) {
      const endPoint = "/disciplines";
      getDiciplinesData(endPoint)
        .then((result) => {
          if (result.data !== "" && result.status === 200) {
            setDiciplineData(result.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [refreshData]);

  // get id, name from discipline table === >>>
  const editHandlerById = ({ id, name, description }: any) => {
    setDisciplineObj({ id: id, name: name, description: description });
  };

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  // handle refresh react table after SAVE data  === >>>
  const refreshDisciplineData = (status: boolean) => {
    setRefreshData(status);
  };

  // handle to open Add Discipline modal === >>>
  const openAddDiscipline = () => {
    toggleModalShow(true);
    setDisciplineObj({ id: 0, name: "", description: "" });
    setRefreshData(false);
  };

  // <<< ===== JSX CUSTOM COMPONENTS ===== >>>
  const DISCIPLINE_TABLE_COMPONENT = (
    <DiciplineTable
      diciplineData={diciplineData}
      editHandlerById={editHandlerById}
      toggleModalShow={toggleModalShow}
      refreshDisciplineData={refreshDisciplineData}
    />
  );

  const DISCIPLINE_MODAL_COMPONENT = (
    <DiciplineModal
      show={modalShow}
      onHide={() => setModalShow(false)}
      togglemodalshow={toggleModalShow}
      disciplineobj={disciplineObj}
      refreshDisciplineData={refreshDisciplineData}
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
      <Header pageHeading="" welcomeIcon={false} />
      <div className='main-content-container'>
        <Sidebar />
        <div className="content-area content-area-slider" id="contentareaslider">
          <Container fluid className="administration-wrapper">
            <div className="site-heading">
              <h3>Discipline</h3>
            </div>
            <hr />
            {DISCIPLINE_BUTTONS}
            {DISCIPLINE_TABLE_COMPONENT}
            {DISCIPLINE_MODAL_COMPONENT}
          </Container>
        </div>      
      </div>      
    </>
  );
};

export default Discipline;

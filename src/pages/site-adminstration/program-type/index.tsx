import React, { useState, useEffect } from "react";
import { getData as getProgramData } from "../../../adapters/microservices";
import { Container, Button } from "react-bootstrap";
import Header from "../../header";
import Sidebar from "../../sidebar";
import ProgramTable from "./programTable";
import AddProgramModal from "./modal";
import { useNavigate } from "react-router-dom";

const ProgramType = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [programTypeData, setProgramTypeData] = useState<any>([]);
  const [programTypeObj, setProgramTypeObj] = useState({});
  const [refreshData, setRefreshData] = useState(true);

  // discipline API call === >>>
  useEffect(() => {
    if (refreshData === true) {
      const endPoint = "/program-types";
      getProgramData(endPoint)
      .then((result) => {
        if (result.data !== "" && result.status === 200) {
          setProgramTypeData(result.data);
        }
      })
      .catch((err) => {
        console.log(err);
        });
    }
  }, [refreshData]);

  // get id, name from the department table === >>>
  const editHandlerById = ({ id, name, description, batchYearRequired }: any) => {
    console.log(batchYearRequired)
    setProgramTypeObj({
      id: id,
      name: name,
      description: description,
      batchYearRequired: batchYearRequired,
    });
  };

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  // handle refresh react table after SAVE data  === >>>
  const refreshProgramData = (status: boolean) => {
    setRefreshData(status);
  };

  // handle to open Add Discipline modal === >>>
  const openAddProgramType = () => {
    toggleModalShow(true);
    setProgramTypeObj({ id: 0, name: "", description: "", BatchYearRequired: false });
    setRefreshData(false);
  };

  // <<< ===== JSX CUSTOM COMPONENTS ===== >>>
  const ADDPROGRAM_MODAL_COMPONENT = (
    <AddProgramModal
      show={modalShow}
      onHide={() => toggleModalShow(false)}
      programtypeobj={programTypeObj}
      togglemodalshow={toggleModalShow}
      refreshprogramdata={refreshProgramData}
    />
  );

  const PROGRAM_TYPE_COMPONENT = (
    <ProgramTable
      programTypeData={programTypeData}
      editHandlerById={editHandlerById}
      setModalShow={setModalShow}
      toggleModalShow={toggleModalShow}
      refreshProgramData={refreshProgramData}
    />
  );

  const PROGRAM_TYPE_BUTTON = (
    <div>
      <Button variant="primary" onClick={openAddProgramType}>
        Add Program Type
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
      <Sidebar />
      <Container fluid>
        <div
          className="contents"
          style={{ paddingLeft: "270px", marginTop: "70px" }}
        >
          <div className="container-wrapper">
            <div className="site-heading">
              <h3>Program Type</h3>
            </div>
          </div>
          <hr />
          {PROGRAM_TYPE_BUTTON}
          {ADDPROGRAM_MODAL_COMPONENT}
          {PROGRAM_TYPE_COMPONENT}
        </div>
      </Container>
    </>
  );
};

export default ProgramType;
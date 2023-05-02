import React, { useState, useEffect } from "react";
import Header from "../../../header";
import Sidebar from "../../../sidebar";
import { Container, Button } from "react-bootstrap";
import ManageGroupTable from "./manageGroupTable";
import GroupModal from "./groupModal";
import { useParams } from "react-router-dom";
import { getData } from "../../../../adapters/microservices/index";

const ManageGroups = () => {
  const { courseid } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [refreshData, setRefreshData] = useState(true);
  const [manageGroupList, setManageGroupList] = useState([]);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [groupObj, setGroupObj] = useState({
    name: "",
    description: "",
  });

  // fetch all manage group data
  useEffect(() => {
    const endPoint = `/${courseid}/group`;
    getData(endPoint, { pageNumber: 0, pageSize: 100 }).then((res: any) => {
      if (res.data !== "" && res.status === 200) {
        setManageGroupList(res.data.items);
      }
    });
  }, [courseid, refreshData]);

  // refresh on delete
  useEffect(() => { 
    if(refreshOnDelete === true){
      const endPoint = `/${courseid}/group`;
      getData(endPoint, { pageNumber: 0, pageSize: 100 }).then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setManageGroupList(res.data.items);
        }
      });
    }
  }, [refreshOnDelete]);

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  // add group modal handler 
  const openAddGroup = () => {
    setModalShow(true);
    setGroupObj({ id: 0, name: "", description: "" });
    setRefreshData(false)
  };

  // get id, name from discipline table === >>>
  const editHandlerById = ({ id, name, description }: any) => {
    setGroupObj({ id: id, name: name, description: description });
  };

  const refreshOnDeleteToggle = (value: boolean) => {
    setRefreshOnDelete(value);
  };

  const Add_Groups_Btn = (
    <Button variant="primary" onClick={openAddGroup}>
      Add Groups
    </Button>
  );

  return (
    <React.Fragment>
      <Header
        pageHeading="Manage Groups: Business Statistics"
        welcomeIcon={false}
      />
      <div className="main-content-container">
        <Sidebar />
        <div
          className="content-area content-area-slider"
          id="contentareaslider"
        >
          <Container fluid className="administration-wrapper">
            {Add_Groups_Btn}
            <GroupModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              setModalShow={setModalShow}
              courseid={courseid}
              groupObj={groupObj}
              refreshGroupData={refreshToggle}
            />
            <hr />
            <ManageGroupTable
              manageGroupList={manageGroupList}
              courseid={courseid}
              refreshOnDelete={refreshOnDeleteToggle}
              setModalShow={setModalShow}
              editHandlerById={editHandlerById}
              refreshGroupData={refreshToggle}
            />
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ManageGroups;

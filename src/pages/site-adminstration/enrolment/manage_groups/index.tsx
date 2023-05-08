import React, { useState, useEffect } from "react";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import HeaderTabs from "../../../headerTabs";
// import Sidebar from "../../../sidebar";
import { Container, Button } from "react-bootstrap";
import ManageGroupTable from "./manageGroupTable";
import GroupModal from "./groupModal";
import { useParams, useNavigate } from "react-router-dom";
import { getData } from "../../../../adapters/microservices/index";
import BuildPagination from "../../../../widgets/pagination";
import { pagination } from "../../../../utils/pagination";

const ManageGroups = () => {
  const navigate = useNavigate()
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const { courseid, programid, coursename } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [refreshData, setRefreshData] = useState(true);
  const [manageGroupList, setManageGroupList] = useState<any>(dummyData);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [groupObj, setGroupObj] = useState({
    name: "",
    description: "",
  });
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });

  // fetch all manage group data
  useEffect(() => {
    const endPoint = `/${courseid}/group`;
    getData(endPoint, filterUpdate).then((res: any) => {
      if (res.data !== "" && res.status === 200) {
        setManageGroupList(res.data);
      }
    });
  }, [courseid, refreshData, filterUpdate]);

  // refresh on delete
  useEffect(() => {
    if (refreshOnDelete === true) {
      const endPoint = `/${courseid}/group`;
      getData(endPoint, filterUpdate).then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setManageGroupList(res.data);
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
    setRefreshData(false);
  };

  // get id, name from discipline table === >>>
  const editHandlerById = ({ id, name, description }: any) => {
    setGroupObj({ id: id, name: name, description: description });
  };

  const refreshOnDeleteToggle = (value: boolean) => {
    setRefreshOnDelete(value);
  };

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  const Add_Groups_Btn = () => {
    return (
      <>
        <Button variant="primary" onClick={openAddGroup}>
          Add Groups
        </Button>{" "}
        <Button
          variant="outline-secondary"
          onClick={() => navigate(`/courseenrollment/${programid}/${courseid}/${coursename}`)}
        >
          Go Back
        </Button>
      </>
    );
  };

  return (
    <React.Fragment>
      <Header />
      <HeaderTabs />
      <div className="contentarea-wrapper mt-3">
          <Container fluid className="administration-box">
            <Add_Groups_Btn />
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
              manageGroupList={manageGroupList.items}
              courseid={courseid}
              refreshOnDelete={refreshOnDeleteToggle}
              setModalShow={setModalShow}
              editHandlerById={editHandlerById}
              refreshGroupData={refreshToggle}
            />
            <BuildPagination
              totalpages={manageGroupList.pager.totalPages}
              activepage={filterUpdate.pageNumber}
              getrequestedpage={newPageRequest}
            />
          </Container>
        </div>
      <Footer />
    </React.Fragment>
  );
};

export default ManageGroups;

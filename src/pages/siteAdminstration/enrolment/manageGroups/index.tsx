import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import HeaderTabs from "../../../headerTabs";
import { Container, Button } from "react-bootstrap";
import ManageGroupTable from "./table";
import GroupModal from "./form";
import { useParams } from "react-router-dom";
import { getData } from "../../../../adapters/microservices/index";
import BuildPagination from "../../../../widgets/pagination";
import { pagination } from "../../../../utils/pagination";
import PageTitle from "../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";
import { makeGetDataRequest } from "../../../../features/api_calls/getdata";

const ManageGroups = () => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const { courseid,name, programid, coursename } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [refreshData, setRefreshData] = useState(true);
  const [manageGroupList, setManageGroupList] = useState<any>(dummyData);
  const [programData, setProgramData] = useState({
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  });
  const [programName, setProgramName] = useState("");
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [groupObj, setGroupObj] = useState({
    name: "",
    description: "",
  });
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  const [apiStatus, setApiStatus] = useState("");
  const currentInstitute = useSelector((state : any) => state.currentInstitute);

  // fetch all manage group data
  useEffect(() => {
    setApiStatus("started")
    const endPoint = `/${courseid}/group`;
    getData(endPoint, filterUpdate).then((res: any) => {
      if (res.data !== "" && res.status === 200) {
        const updatedItems = res.data.items.map((item : any ) => {
          const matchingGroup = res.data.groupUserCounts.find((group : any) => group.groupId === item.id);
          if (matchingGroup) {
            return { ...item, totalMembers: matchingGroup.totalMembers };
          } else {
            return { ...item, totalMembers: 0 };
          }
          return item;
        });
        
        res.data.items = updatedItems;
        setManageGroupList(res.data);
      }
      setApiStatus("finished")
    });
  }, [courseid, refreshData, filterUpdate]);

  useEffect(() => {
    makeGetDataRequest(
      `${currentInstitute}/programs`,
      { pageNumber: 0, pageSize: pagination.PERPAGE, Id: programid },
      setProgramData, setApiStatus
    );
  }, []);

  useEffect(() => {
    if (programData.items.length === 1) {
      setProgramName(programData.items[0].name);
    }
  }, [programData]);

  // refresh on delete
  useEffect(() => {
    setApiStatus("started")
    if (refreshOnDelete === true) {
      const endPoint = `/${courseid}/group`;
      getData(endPoint, filterUpdate).then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setManageGroupList(res.data);
        }
        setApiStatus("finished")
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
        </Button>
      </>
    );
  };

  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="siteadmin"/>
      <BreadcrumbComponent
            routes={[
              { name: "Site Administration", path: "/siteadmin" },
              { name: "Program Enrollment", path: "/programenrollment" },
              { name: name, path: `/enrolusers/${programid}/${name}`},
              { name: coursename, path: `/courseenrollment/${programid}/${name}/${courseid}/${coursename}` },
              { name: "Manage Groups", path: "" },
            ]}
          />
      <div className="contentarea-wrapper mt-3">
          <Container fluid>
          <PageTitle 
            pageTitle = "Manage Group" gobacklink = {`/courseenrollment/${programid}/${name}/${courseid}/${coursename}`}
          />
            <Add_Groups_Btn />
            <GroupModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              setModalShow={setModalShow}
              courseid={courseid}
              groupObj={groupObj}
              refreshGroupData={refreshToggle}
            />
            <ManageGroupTable
              manageGroupList={manageGroupList.items}
              courseid={courseid}
              refreshOnDelete={refreshOnDeleteToggle}
              setModalShow={setModalShow}
              editHandlerById={editHandlerById}
              refreshGroupData={refreshToggle}
              apiStatus={apiStatus}
              currentInstitute={currentInstitute}
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

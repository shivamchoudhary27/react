import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import View from "./view";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { pagination } from "../../../../utils/pagination";
import { getData } from "../../../../adapters/microservices/index";
import { makeGetDataRequest } from "../../../../features/apiCalls/getdata";
const ManageGroups = () => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [modalShow, setModalShow] = useState(false);
  const [refreshData, setRefreshData] = useState(true);
  const { courseid, name, programid, coursename } = useParams();
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
    published:"",
  });
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  const [apiStatus, setApiStatus] = useState("");
  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );
  const userAuthorities = useSelector(
    (state: any) => state.userAuthorities.permissions.group
  );

  // fetch all manage group data
  useEffect(() => {
    setApiStatus("started");
    const endPoint = `/${courseid}/group`;
    getData(endPoint, filterUpdate).then((res: any) => {
      if (res.data !== "" && res.status === 200) {
        const updatedItems = res.data.items.map((item: any) => {
          const matchingGroup = res.data.groupUserCounts.find(
            (group: any) => group.groupId === item.id
          );
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
      setApiStatus("finished");
    });
  }, [courseid, refreshData, filterUpdate]);

  useEffect(() => {
    makeGetDataRequest(
      `${currentInstitute}/programs`,
      { pageNumber: 0, pageSize: pagination.PERPAGE, Id: programid },
      setProgramData,
      setApiStatus
    );
  }, []);

  useEffect(() => {
    if (programData.items.length === 1) {
      setProgramName(programData.items[0].name);
    }
  }, [programData]);

  // refresh on delete
  useEffect(() => {
    setApiStatus("started");
    if (refreshOnDelete === true) {
      const endPoint = `/${courseid}/group`;
      getData(endPoint, filterUpdate).then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setManageGroupList(res.data);
        }
        setApiStatus("finished");
      });
    }
  }, [refreshOnDelete]);

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  // add group modal handler
  const openAddGroup = () => {
    setModalShow(true);
    setGroupObj({ id: 0, name: "", description: "", published: ""});
    setRefreshData(false);
  };

  // get id, name from discipline table === >>>
  const editHandlerById = ({ id, name, description,published}: any) => {
    setGroupObj({ id: id, name: name, description: description, published: published, });
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
    <View
      name={name}
      programid={programid}
      coursename={coursename}
      courseid={courseid}
      groupObj={groupObj}
      Add_Groups_Btn={Add_Groups_Btn}
      modalShow={modalShow}
      apiStatus={apiStatus}
      setModalShow={setModalShow}
      refreshToggle={refreshToggle}
      newPageRequest={newPageRequest}
      userAuthorities={userAuthorities}
      editHandlerById={editHandlerById}
      currentInstitute={currentInstitute}
      filterUpdate={filterUpdate.pageNumber}
      manageGroupList={manageGroupList.items}
      totalPages={manageGroupList.pager.totalPages}
      refreshOnDeleteToggle={refreshOnDeleteToggle}
    />
  );
};

export default ManageGroups;
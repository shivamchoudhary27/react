import View from "./view";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { pagination } from "../../../../utils/pagination";
import { getData } from "../../../../adapters/microservices";

const ManageTopic = () => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [topicData, setTopicData] = useState(dummyData);
  const [apiStatus, setApiStatus] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [refreshData, setRefreshData] = useState(true);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  const permissions = useSelector(
    (state: any) => state.userAuthorities.permissions.institute
  );
  const [topicObj, setTopicObj] = useState({
    id: 0,
    topicName: "",
    description: "",
    published: false,
  });

  // call api on delete handler === >>>
  useEffect(() => {
    if (refreshOnDelete === true) {
      getData("/topic", filterUpdate)
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            if (result.data.items.length < 1) {
            }
            setTopicData(result.data);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [refreshOnDelete]);

  // call api to get all topics === >>>
  useEffect(() => {
    setApiStatus("started");
    getData("/topic", filterUpdate)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          if (result.data.items.length < 1) {
          }
          setTopicData(result.data);
        }
        setApiStatus("finished");
      })
      .catch((err: any) => {
        console.log(err);
        setApiStatus("finished");
      });
  }, [refreshData, filterUpdate]);

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  const refreshOnDeleteToggle = (value: boolean) => {
    setRefreshOnDelete(value);
  };

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  const updateSearchFilters = (newFilterRequest: any, reset = false) => {
    console.log(updateSearchFilters);
    if (reset === true) {
      let updatedState = { ...filterUpdate, pageNumber: 0 };
      if (updatedState.topicName !== undefined) delete updatedState.topicName;

      setFilterUpdate(updatedState);
    } else {
      const { topicName } = newFilterRequest;
      let updatedState = {
        ...filterUpdate,
        pageNumber: 0,
        ...newFilterRequest,
      };

      if (topicName === "") delete updatedState.topicName;

      setFilterUpdate(updatedState);
    }
  };

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  // get id, name from the department table === >>>
  const editHandlerById = ({ id, topicName, description, published }: any) => {
    setTopicObj({
      id: id,
      topicName: topicName,
      description: description,
      published: published,
    });
  };

  // handle to open Add Discipline modal === >>>
  const openAddTopicModal = () => {
    toggleModalShow(true);
    setTopicObj({
      id: 0,
      topicName: "",
      description: "",
      published: false,
    });
    // setRefreshData(false);
  };

  return (
    <View
      topicObj={topicObj}
      apiStatus={apiStatus}
      modalShow={modalShow}
      topicData={topicData.items}
      permissions={permissions}
      filterUpdate={filterUpdate.pageNumber}
      topicDataPage={topicData.pager.totalPages}
      refreshToggle={refreshToggle}
      newPageRequest={newPageRequest}
      editHandlerById={editHandlerById}
      toggleModalShow={toggleModalShow}
      openAddTopicModal={openAddTopicModal}
      refreshOnDeleteToggle={refreshOnDeleteToggle}
    />
  );
};

export default ManageTopic;

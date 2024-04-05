import View from "./view";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { pagination } from "../../../utils/pagination";
import { getData } from "../../../adapters/microservices";

type Props = {};

const TeacherHelpdesk = (props: Props) => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [modalShow, setModalShow] = useState(false);
  const [apiStatus, setApiStatus] = useState("");
  const [getAllComment, setGetAllComment] = useState([]);
  const [refreshData, setRefreshData] = useState(true);
  const [enquiryData, setEnquiryData] = useState(dummyData);
  const [selectedTopicId, setSelectedTopicId] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState(dummyData);
  const [selectedProgram, setSelectedProgram] = useState(dummyData);
  const [repliesModalShow, setRepliesModalShow] = useState({
    status: false,
    action: "",
    topicname: "",
    dateValue: ""
  });

  const [filterUpdate, setFilterUpdate] = useState<any>({
    topicId: "",
    topicName: "",
    sortBy: "",
    sortOrder: "",
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });

  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );
   
  // call api to get all enquiry === >>>
  useEffect(() => {
    setApiStatus("started");
    getData("/enquiry", filterUpdate)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          setEnquiryData(result.data);
        }
        setApiStatus("finished");
      })
      .catch((err: any) => {
        console.log(err);
        setApiStatus("finished");
      });
  }, [refreshData,filterUpdate]);

  // call api to get all programs === >>>
  useEffect(() => {
    getData(`/${currentInstitute}/programs`, {pageNumber: 0,
      pageSize: pagination.PERPAGE})
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          setSelectedProgram(result.data);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  // call api to get all topics === >>>
  useEffect(() => {
    // setApiStatus("started");
    getData("/topic", filterUpdate)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          setSelectedTopic(result.data);
        }
        // setApiStatus("finished");
      })
      .catch((err: any) => {
        console.log(err);
        // setApiStatus("finished");
      });
  }, [refreshData]);

  useEffect(() => {
    // setApiStatus("started");
    if (selectedTopicId > 0) {
      getData(`/comment/${selectedTopicId}/allComment`, {})
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            setGetAllComment(result.data);
          }
          if (!repliesModalShow.status) {
            setGetAllComment([]);
          }
          // setApiStatus("finished");
        })
        .catch((err: any) => {
          // setApiStatus("finished");
          if(err.response.status === 500){
            console.log(err.response.data.message);
          }
        });
    }
  }, [selectedTopicId, selectedTopic, repliesModalShow.status]);


  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  const toggleRepliesModalShow = ({
    status,
    action,
    topicname,
    dateValue
  }: {
    status: boolean;
    action: string;
    topicname: string,
    dateValue: any
  }) => {
    setRepliesModalShow({ status: status, action: action, topicname: topicname, dateValue: dateValue });
  };

  const getSelectedTopicId = (id: number) => {
    setSelectedTopicId(id);
  };

   // to update filters values in the main state filterUpdate
  const updateTopicFilter = (topicId: string,published: string | undefined) => {
    setFilterUpdate({
      ...filterUpdate,
      topicId: topicId,
      pageNumber: 0,
      published: published === "" ? undefined : published,
    });
  };
  
  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  return (
    <View
      apiStatus={apiStatus}
      modalShow={modalShow}
      filterUpdate={filterUpdate}
      setFilterUpdate={setFilterUpdate}
      selectedProgram={selectedProgram.items}
      modalTitle={repliesModalShow.topicname}
      modalTitleDate={repliesModalShow.dateValue}
      refreshToggle={refreshToggle}
      getAllComment={getAllComment}
      newPageRequest={newPageRequest}
      enquiryData={enquiryData.items}
      selectedTopicId={selectedTopicId}
      toggleModalShow={toggleModalShow}
      selectedTopic={selectedTopic.items}
      updateTopicFilter={updateTopicFilter}
      onHide={() => toggleModalShow(false)}
      getSelectedTopicId={getSelectedTopicId}
      repliesAction={repliesModalShow.action}
      totalPages={enquiryData.pager.totalPages}
      repliesModalShow={repliesModalShow.status}
      toggleRepliesModalShow={toggleRepliesModalShow}
      onRepliesHide={() =>
        toggleRepliesModalShow({ status: false, action: "", topicname: "", dateValue: ''})
      }
    />
  );
};

export default TeacherHelpdesk;

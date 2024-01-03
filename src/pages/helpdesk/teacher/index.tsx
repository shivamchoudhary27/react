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
  const [enquiryData, setEnquiryData] = useState(dummyData);
  const [selectedTopicId, setSelectedTopicId] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState(dummyData);
  const [repliesModalShow, setRepliesModalShow] = useState({
    status: false,
    action: "",
  });

  const selectTopic = useSelector(
    (state) => state.globalFilters.currentTopicFilterId
  );

  console.log(selectTopic);

  const [filterUpdate, setFilterUpdate] = useState<any>({
    topicId: selectTopic,
    topicName: "",
    published: "",
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
   
  // call api to get all enquiry === >>>
  useEffect(() => {
    setApiStatus("started");
    getData("/enquiry", filterUpdate)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          console.log(result.data, "-----------enquiry");
          setEnquiryData(result.data);
        }
        setApiStatus("finished");
      })
      .catch((err: any) => {
        console.log(err);
        setApiStatus("finished");
      });
  }, [filterUpdate]);

  // call api to get all topics === >>>
  useEffect(() => {
    getData("/topic", filterUpdate)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          // console.log(result.data);
          setSelectedTopic(result.data);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (selectedTopicId > 0) {
      getData(`/comment/${selectedTopicId}/allComment`, {})
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            // console.log(result.data,"id select",selectedTopicId);
            setGetAllComment(result.data);
          }
          if (!repliesModalShow.status) {
            console.log('Resetting getAllComment');
            setGetAllComment([]);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [selectedTopicId, selectedTopic,repliesModalShow.status]);


  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  const toggleRepliesModalShow = ({
    status,
    action,
  }: {
    status: boolean;
    action: string;
  }) => {
    setRepliesModalShow({ status: status, action: action });
  };

  const getSelectedTopicId = (id: number) => {
    setSelectedTopicId(id);
  };

   // to update filters values in the main state filterUpdate
   const updateTopicFilter = (topicId: string, published:Boolean) => {
    setFilterUpdate({
      ...filterUpdate,
      topicId: topicId,
      pageNumber: 0,
      published: published,
    });
  };


  const updateInputFilters = (inputvalues: any, published:any) => {
    console.log(inputvalues);
    setFilterUpdate({ ...filterUpdate, topicName: inputvalues, published: published, pageNumber: 0 });
  };

  // display the data in table unique
  // const unique = enquiryData.items;
  // console.log(unique)
  // const uniqueEnquiryData = unique.filter(
  //   (item, index, array) =>
  //     index === array.findIndex((t:any) => t.topicId === item.topicId)
  // );

  // console.log(uniqueEnquiryData, 'data');
  
  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  return (
    <View
      apiStatus={apiStatus}
      modalShow={modalShow}
      filterUpdate={filterUpdate}
      getAllComment={getAllComment}
      newPageRequest={newPageRequest}
      enquiryData={enquiryData.items}
      selectedTopicId={selectedTopicId}
      toggleModalShow={toggleModalShow}
      setGetAllComment={setGetAllComment}
      selectedTopic={selectedTopic.items}
      updateTopicFilter={updateTopicFilter}
      onHide={() => toggleModalShow(false)}
      // uniqueEnquiryData={uniqueEnquiryData}
      getSelectedTopicId={getSelectedTopicId}
      updateInputFilters={updateInputFilters}
      repliesAction={repliesModalShow.action}
      totalPages={enquiryData.pager.totalPages}
      repliesModalShow={repliesModalShow.status}
      toggleRepliesModalShow={toggleRepliesModalShow}
      onRepliesHide={() =>
        toggleRepliesModalShow({ status: false, action: "" })
      }
    />
  );
};

export default TeacherHelpdesk;

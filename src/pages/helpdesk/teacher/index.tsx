import View from "./view";
import { useState, useEffect } from "react";
import { pagination } from "../../../utils/pagination";
import { getData } from "../../../adapters/microservices";
import { useParams } from "react-router-dom";

type Props = {};

const TeacherHelpdesk = (props: Props) => {
  const { id } = useParams();

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
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });

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
  }, [filterUpdate]);

  // call api to get all topics === >>>
  useEffect(() => {
    getData("/topic", filterUpdate)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          setSelectedTopic(result.data);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  // call API for get all comments of specific topic === >>
  useEffect(() => {
    if (selectedTopicId > 0) {
      getData(`/comment/${selectedTopicId}/allComment`, {})
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            setGetAllComment(result.data);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [selectedTopicId, selectedTopic]);

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

  return (
    <View
      apiStatus={apiStatus}
      modalShow={modalShow}
      getAllComment={getAllComment}
      enquiryData={enquiryData.items}
      getSelectedTopicId={getSelectedTopicId}
      toggleModalShow={toggleModalShow}
      selectedTopic={selectedTopic.items}
      onHide={() => toggleModalShow(false)}
      repliesAction={repliesModalShow.action}
      repliesModalShow={repliesModalShow.status}
      toggleRepliesModalShow={toggleRepliesModalShow}
      onRepliesHide={() =>
        toggleRepliesModalShow({ status: false, action: "" })
      }
    />
  );
};

export default TeacherHelpdesk;

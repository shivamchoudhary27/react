import React, { useEffect, useState } from "react";
import LevelThresholdTable from "./table";
import { useParams } from "react-router-dom";
import { getData } from "../../../../adapters/microservices";
import { Button } from "react-bootstrap";
import AddCosModal from "./addCosModal";
import { pagination } from "../../../../utils/pagination";
import { isConditionalExpression } from "typescript";

type Props = {
  setActiveTab: any;
};

const LevelThreshold = (props: Props) => {
  console.log("inside page 2--------------")
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const { id } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [allCourseOutcome, setAllCourseOutcome] = useState(dummyData);
  const [cosAbbreviation, setCosAbbreviation] = useState({
    abbreviation: "",
    abstact: "",
  });
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [refreshData, setRefreshData] = useState<boolean>(true);
  const [apiStatus, setApiStatus] = useState("");
  const [outcomeObj, setOutcomeObj] = useState({
    id: 0,
    suffixValue: "",
    target: "",
    description: "",
  });
  const [apiCallTrack, setApiCallTrack] = useState();

  useEffect(() => {
    getData(`/${id}/courseoutcomes`, {})
      .then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          console.log(res.data);
          setCosAbbreviation(res.data);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [props.setActiveTab]);

  useEffect(() => {
    setApiStatus("started");
    getData(`/${id}/courseoutcomes/getall`, filterUpdate)
      .then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setAllCourseOutcome(res.data);
        }
        setApiStatus("finished");
      })
      .catch((err: any) => {
        console.log(err);
        setApiStatus("finished");
      });
  }, [id, refreshData]);

  // Refresh api call on delete
  useEffect(() => {
    if (refreshOnDelete) {
      getData(`/${id}/courseoutcomes/getall`, filterUpdate)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            setAllCourseOutcome(res.data);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [refreshOnDelete]);

  // get id, name from the department table === >>>
  const editHandlerById = ({ ...getEditHandlerValue }) => {
    setOutcomeObj({
      id: getEditHandlerValue.id,
      suffixValue: getEditHandlerValue.suffixValue,
      target: getEditHandlerValue.target,
      description: getEditHandlerValue.description,
    });
  };

  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  const refreshOnDeleteToggle = (value: boolean) => {
    setRefreshOnDelete(value);
  };

  const addCosHandler = () => {
    toggleModalShow(true);
    setOutcomeObj({
      id: 0,
      suffixValue: "",
      target: "",
      description: "",
    });
  };

  return (
    <React.Fragment>
      <LevelThresholdTable
        apiStatus={apiStatus}
        setActiveTab={props.setActiveTab}
        allCourseOutcome={allCourseOutcome.items}
        refreshOnDeleteToggle={refreshOnDeleteToggle}
        toggleModalShow={toggleModalShow}
        refreshToggle={refreshToggle}
        editHandlerById={editHandlerById}
      />

      <div className="my-3">
        <Button
          variant="primary"
          type="button"
          onClick={() => addCosHandler()}
          className="me-2"
          size="sm"
        >
          <i className="fa-solid fa-plus"></i> Add CO's
        </Button>
      </div>
      <AddCosModal
        modalShow={modalShow}
        outcomeObj={outcomeObj}
        cosAbbreviation={cosAbbreviation.abbreviation}
        refreshToggle={refreshToggle}
        toggleModalShow={toggleModalShow}
        onHide={() => toggleModalShow(false)}
      />
    </React.Fragment>
  );
};

export default LevelThreshold;

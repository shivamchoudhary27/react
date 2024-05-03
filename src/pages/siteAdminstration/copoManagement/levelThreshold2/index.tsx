import React, { useEffect, useState } from "react";
import { getData } from "../../../../adapters/microservices";
import { useParams } from "react-router-dom";
import { pagination } from "../../../../utils/pagination";
import LevelThreshold2Table from "./levelThreshold2";

type Props = {
  setActiveTab: any;
};

const LevelThreshold2 = (props: Props) => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const { id } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [allCourseOutcome, setAllCourseOutcome] = useState(dummyData);
  const [levelData, setLevelData] = useState(dummyData);
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
  const [initialValues, setInitialValue] = useState({});

  useEffect(() => {
    getData(`/${id}/courseoutcome/level`, filterUpdate)
      .then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setLevelData(res.data);
          const initialData = res.data.items.reduce((acc: any, item: any) => {
            // Iterate over each item and construct keys based on level and ID
            Object.keys(item).forEach((key) => {
              if (
                key !== "abbreviation" &&
                key !== "id" &&
                key !== "suffixValue"
              ) {
                // Construct the new key based on level, ID, and the original key
                const newKey = `${key}_${item.id}`;
                // Set the value to the new key in the accumulator object
                acc[newKey] = item[key];
              }
            });
            return acc;
          }, {});
          setInitialValue(initialData);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [props.setActiveTab]);

  return (
    <div>
      <LevelThreshold2Table
        levelData={levelData.items}
        setActiveTab={props.setActiveTab}
        initialValues={initialValues}
        setInitialValue={setInitialValue}
      />
    </div>
  );
};

export default LevelThreshold2;

import React, { useEffect, useState } from "react";
import AttainmentTable from "./attainmentTable";
import { getData } from "../../../../adapters/microservices";
import { useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";

type Props = {
  refreshTab: any;
  setActiveTab: any;
  tabRefreshToggle: any;
};

const AttainmentCourseOutcome = (props: Props) => {
  const { cid } = useParams();
  const dummyData = {
    items: [],
    moodleData: {},
  };
  const [courseAttainmentData, setCourseAttainmentData] = useState(dummyData);
  const [courseAttainmentMoodleData, setCourseAttainmentMoodleData] = useState(
    []
  );
  const [courseAttainmentApiStatus, setCourseAttainmentApiStatus] =
    useState("");

  useEffect(() => {
    setCourseAttainmentApiStatus("started");
    getData(`/${cid}/attainment/mapping`, {})
      .then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setCourseAttainmentData(res.data);
          if (res.data.moodleData !== null) {
            setCourseAttainmentMoodleData(res.data.moodleData);
          }
        }
        setCourseAttainmentApiStatus("finished");
      })
      .catch((err: any) => {
        console.log(err);
        setCourseAttainmentApiStatus("finished");
      });
  }, [props.refreshTab]);

  return (
    <div>
      <AttainmentTable
        setActiveTab={props.setActiveTab}
        tabRefreshToggle={props.tabRefreshToggle}
        courseAttainmentData={courseAttainmentData.items}
        courseAttainmentApiStatus={courseAttainmentApiStatus}
        courseAttainmentMoodleData={courseAttainmentMoodleData}
      />
      <Alert variant="primary" className="mt-4">
        <strong>Note:</strong>
        <ul>
          <li>
            Course Exit Survay (Indirect Methods) mark come from feedback
            activity selected.
          </li>
        </ul>
      </Alert>
    </div>
  );
};

export default AttainmentCourseOutcome;

import React, { useEffect, useState } from "react";
import AttainmentTable from "./attainmentTable";
import { getData } from "../../../../adapters/microservices";
import { useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";

type Props = {
  setActiveTab: any;
};

const AttainmentCourseOutcome = (props: Props) => {
  const { cid } = useParams();
  const [courseAttainmentData, setCourseAttainmentData] = useState([]);
  const [courseAttainmentApiStatus, setCourseAttainmentApiStatus] = useState("")

  useEffect(() => {
    setCourseAttainmentApiStatus("started");
    getData(`/${cid}/attainment/mapping`, {})
      .then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          console.log(res.data);
          setCourseAttainmentData(res.data);
        }
        setCourseAttainmentApiStatus("finished");
      })
      .catch((err: any) => {
        console.log(err);
        setCourseAttainmentApiStatus("finished");
      });
  }, [props.setActiveTab]);

  return (
    <div>
      <AttainmentTable
        setActiveTab={props.setActiveTab}
        courseAttainmentData={courseAttainmentData}
        courseAttainmentApiStatus={courseAttainmentApiStatus}

      />
      <Alert variant="primary" className="mt-4">
        <strong>Note:</strong>
        <ul>
          <li>Course Exit Survay (Indirect Methods) mark come from feedback activity selected.</li>
        </ul>
      </Alert>
    </div>
  );
};

export default AttainmentCourseOutcome;

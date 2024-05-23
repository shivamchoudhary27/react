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
  const [courseAttainmentApiStatus, setCourseAttainmentApiStatus] =
    useState("");
  const [initialValues, setInitialValue] = useState({});

  useEffect(() => {
    setCourseAttainmentApiStatus("started");
    getData(`/${cid}/attainment/mapping`, {})
      .then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setCourseAttainmentData(res.data);
          const initialData = res.data.reduce(
            (
              acc: { [x: string]: any },
              item: { [x: string]: any; id?: any }
            ) => {
              Object.keys(item).forEach((key) => {
                const newKey = `${key}_${item.id}`;
                acc[newKey] = item[key];
              });
              return acc;
            },
            {}
          );
          setInitialValue(initialData);
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
        initialValues={initialValues}
        setActiveTab={props.setActiveTab}
        courseAttainmentData={courseAttainmentData}
        courseAttainmentApiStatus={courseAttainmentApiStatus}
        setInitialValue={setInitialValue}
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

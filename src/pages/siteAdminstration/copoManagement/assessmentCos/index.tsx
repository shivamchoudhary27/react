import React, { useEffect, useState } from "react";
import AssessmentTable from "./assessmentTable";
import { Alert } from "react-bootstrap";
import { getData } from "../../../../adapters/microservices";
import { useParams } from "react-router-dom";

type Props = {
  setActiveTab: any;
};

const AssessmentForCOs = (props: Props) => {
  const { cid } = useParams();
  const dummyData = {
    items: [],
    moodleData: {}
  }
  const [apiStatus, setApiStatus] = useState("");
  const [refreshData, setRefreshData] = useState<boolean>(true);
  const [assessmentMappingData, setAssessmentMappingData] = useState(dummyData);
  const [initialValues, setInitialValue] = useState({});

  useEffect(() => {
    setApiStatus("started");
    getData(`/${cid}/assessment/mapping`, {})
      .then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setAssessmentMappingData(res.data);
          const initialData = res.data.items.reduce(
            (
              acc: { [x: string]: any },
              item: { [x: string]: any; id?: any }
            ) => {
              Object.keys(item).forEach((key) => {
                // if (key !== "assements") {
                  const newKey = `${key}_${item.id}`;
                  acc[newKey] = item[key];
                // }
              });
              return acc;
            },
            {}
          );
          setInitialValue(initialData);
        }
        setApiStatus("finished");
      })
      .catch((err: any) => {
        setApiStatus("finished");
        console.log(err);
      });
  }, []);

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  return (
    <div>
      <AssessmentTable 
        apiStatus={apiStatus}
        refreshToggle={refreshToggle}
        initialValues={initialValues}
        setInitialValue={setInitialValue}
        setActiveTab={props.setActiveTab} 
        assessmentData={assessmentMappingData.items}
         />
      <Alert variant="primary" className="mt-4">
        <strong>Note:</strong>
        <ul>
          <li>ESE mark calculated offline and put here manually.</li>
          <li>
            Test, AI and LAB marks come automatically from the Quiz and
            Assignment grade book.
          </li>
        </ul>
      </Alert>
    </div>
  );
};

export default AssessmentForCOs;

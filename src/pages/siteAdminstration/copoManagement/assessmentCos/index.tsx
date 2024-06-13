import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AssessmentTable from "./assessmentTable";
import React, { useEffect, useState } from "react";
import { getData } from "../../../../adapters/microservices";

type Props = {
  setActiveTab: any;
  tabRefreshToggle: any;
  refreshTab: any;
  activeTab: any
};

const AssessmentForCOs = (props: Props) => {
  const { cid } = useParams();
  const dummyData = {
    items: [],
    moodleData: {},
  };
  const [apiStatus, setApiStatus] = useState("");
  const [refreshData, setRefreshData] = useState<boolean>(true);
  const [assessmentMappingData, setAssessmentMappingData] = useState(dummyData);
  const [assessmentMoodleData, setAssessmentMoodleData] = useState([]);
  const [highestLabSuffixValue, setHighestLabSuffixValue] = useState(0);
  const [highestIaSuffixValue, setHighestIaSuffixValue] = useState(0);

  useEffect(() => {
    setApiStatus("started");
    getData(`/${cid}/assessment/mapping`, {})
      .then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setAssessmentMappingData(res.data);
          if (res.data.moodleData !== null) {
            setAssessmentMoodleData(res.data.moodleData);
          }
          // const initialData = res.data.items.reduce(
          //   (
          //     acc: { [x: string]: any },
          //     item: { [x: string]: any; id?: any }
          //   ) => {
          //     Object.keys(item).forEach((key) => {
          //       // if (key !== "assements") {
          //         const newKey = `${key}_${item.id}`;
          //         acc[newKey] = item[key];
          //       // }
          //     });
          //     return acc;
          //   },
          //   {}
          // );
          // setInitialValue(initialData);
        }
        setApiStatus("finished");
      })
      .catch((err: any) => {
        setApiStatus("finished");
        console.log(err);
      });
  }, [props.refreshTab, refreshData, props.activeTab == 4]);

  // calculate highest LAB suffix value === >
  useEffect(() => {
    const highestValue = assessmentMappingData.items.reduce(
      (max, assessment) => {
        assessment.assements.forEach(
          (a: { assessmentType: string; suffixValue: number }) => {
            if (a.assessmentType === "lab" && a.suffixValue > max) {
              max = a.suffixValue;
            }
          }
        );
        return max;
      },
      0
    );
    setHighestLabSuffixValue(highestValue);
  }, [assessmentMappingData.items]);

  // calculate highest IA suffix value === >
  useEffect(() => {
    const highestValue = assessmentMappingData.items.reduce(
      (max, assessment) => {
        assessment.assements.forEach(
          (a: { assessmentType: string; suffixValue: number }) => {
            if (a.assessmentType === "ia" && a.suffixValue > max) {
              max = a.suffixValue;
            }
          }
        );
        return max;
      },
      0
    );
    setHighestIaSuffixValue(highestValue);
  }, [assessmentMappingData.items]);

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  return (
    <div>
      <AssessmentTable
        apiStatus={apiStatus}
        refreshToggle={refreshToggle}
        setActiveTab={props.setActiveTab}
        tabRefreshToggle={props.tabRefreshToggle}
        assessmentMoodleData={assessmentMoodleData}
        highestIaSuffixValue={highestIaSuffixValue}
        assessmentData={assessmentMappingData.items}
        highestLabSuffixValue={highestLabSuffixValue}
      />
      {/* <AssessmentTable 
        apiStatus={apiStatus}
        refreshToggle={refreshToggle}
        initialValues={initialValues}
        setInitialValue={setInitialValue}
        setActiveTab={props.setActiveTab} 
        assessmentData={assessmentMappingData.items}
        assessmentMoodleData={assessmentMoodleData}
         /> */}
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

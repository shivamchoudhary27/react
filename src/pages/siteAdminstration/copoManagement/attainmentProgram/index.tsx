import ViewTable from "./table";
import { Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../../../adapters/microservices";

type Props = {
  setActiveTab: any;
  tabRefreshToggle: any;
  refreshTab: any;
  activeTab: any;
};

const ViewCOsPOsPSOs = (props: Props) => {
  const { cid } = useParams();
  const [programOutcomes, setProgramOutcomes] = useState({ items: [] });
  const [courseoutcomeApiStatus, setCourseoutcomeApiStatus] = useState("");

  useEffect(() => {
    setCourseoutcomeApiStatus("started");
    getData(`/${cid}/program/attainment`, {})
      .then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setProgramOutcomes(res.data);
        }
        setCourseoutcomeApiStatus("finished");
      })
      .catch((err: any) => {
        console.log(err);
        setCourseoutcomeApiStatus("finished");
      });
  }, [props.refreshTab, props.activeTab == 6]);

  return (
    <>
      <ViewTable
        setActiveTab={props.setActiveTab}
        programOutcomes={programOutcomes.items}
        // tabRefreshToggle={props.tabRefreshToggle}
        courseoutcomeApiStatus={courseoutcomeApiStatus}
      />
      <Alert variant="primary" className="mt-4">
        <strong>Note:</strong>
        <ul>
          <li>
            The values displayed in the table represent the{" "}
            <strong>Actual attainment level </strong>achieved by students
            compared to the <strong>Required attainment level</strong>.
          </li>
        </ul>
      </Alert>
    </>
  );
};

export default ViewCOsPOsPSOs;

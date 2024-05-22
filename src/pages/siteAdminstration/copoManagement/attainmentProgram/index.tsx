import ViewTable from "./table";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData } from "../../../../adapters/microservices";

type Props = {
  setActiveTab: any;
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
        console.log(err)
        setCourseoutcomeApiStatus("finished");
      });
  }, [props.setActiveTab]);

  return (
    <>
      <ViewTable
        setActiveTab={props.setActiveTab}
        programOutcomes={programOutcomes.items}
        // tabRefreshToggle={props.tabRefreshToggle}
        courseoutcomeApiStatus={courseoutcomeApiStatus}
      />
    </>
  );
};

export default ViewCOsPOsPSOs;

import { Link } from "react-router-dom";
import FilterDropdown from "../../filterDropdown";
import Errordiv from "../../../../../../../widgets/alert/errordiv";
import ListSkeleton from "../../../../../../../widgets/skeleton/list";

type Props = {
  blTimeline: any;
  apiStatus: string;
};

const Mobile = (props: Props) => {
  const getTimetableTime = (sessionDate: number) => {
    const timestamp = sessionDate * 1000; // Convert from seconds to milliseconds
    const date = new Date(timestamp);
    const time = date.toLocaleTimeString();
    return time;
  };
  return (
    <div className="mitblock activityTimeline-block">
      <h3 className="mitblock-title">Activity Timeline</h3>
      <FilterDropdown blTimeline={props.blTimeline} />
      <div className="mitblock-body">
        {props.blTimeline.status !== "recordnotfound" &&
          props.blTimeline.info !== "" &&
          props.apiStatus !== "started" &&
          JSON.parse(props.blTimeline.info).map((item: any, index: number) =>
            item.dateevents.map((el: any) => (
              <div className="d-flex align-items-center atb-row" key={index}>
                <div className="align-self-start me-3">
                  <img src={el.iconurl} alt="Schedule Icon" />
                </div>
                <div className="atb-info">
                  <h6>{el.name}</h6>
                  <p>{el.coursename}</p>
                  <p>{getTimetableTime(item.datetimestamp)}</p>
                </div>
                <Link to="#" className="btn btn-light btn-sm atb-button">
                  {el.actionname}
                </Link>
              </div>
            ))
          )}
        {props.apiStatus === "started" &&
          props.blTimeline.info.length === 0 && <ListSkeleton />}
        {props.apiStatus === "finished" &&
          props.blTimeline.info.length === 0 && (
            <Errordiv msg="No record found!" cstate className="" />
          )}
      </div>
    </div>
  );
};

export default Mobile;

const tableData = [
  {
    title: "The Natural Number System",
    subtitle: "Discrete Mathmatical Structures",
    link: "Add submission",
    time: "14 : 30",
  },
  {
    title: "Arrays",
    subtitle: "Data structure & Algorithms",
    link: "Attempt Quiz",
    time: "11 : 15",
  },
];

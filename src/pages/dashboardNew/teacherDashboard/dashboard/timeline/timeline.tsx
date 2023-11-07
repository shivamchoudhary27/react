import "./style.scss";
import TimelineTable from "./timelineTable";
import FilterDropdown from "./filterDropdown";

type Props = {
  eventsPacket: any;
  apiStatus: string;
  showAlert: boolean;
  getFilterSelectValue: any
};

const Timeline: React.FC<Props> = (props) => {
  return (
    <div className="mitblock activityTimeline-block">
      <h3 className="mitblock-title">Activity Timeline</h3>
      <FilterDropdown eventsPacket={props.eventsPacket} getFilterSelectValue={props.getFilterSelectValue} />
      <TimelineTable
        apiStatus={props.apiStatus}
        showAlert={props.showAlert}
        eventsPacket={props.eventsPacket}
      />
    </div>
  );
};

export default Timeline;

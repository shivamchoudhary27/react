import "./style.scss";
import React, { Suspense } from "react";
import TimelineTable from "./timelineTable";
import FilterDropdown from "./filterDropdown";

type Props = {
  eventsPacket: any;
  apiStatus: string;
  showAlert: boolean;
  apiStatusCourse: string;
  getSortFilterValue: any;
  getFilterSelectValue: any;
  courseFilterActive: boolean;
  filterTimestampSort: string;
  filterTimestampValue: string;
};

const Timeline: React.FC<Props> = (props) => {
  
  return (
    <div className="mitblock activityTimeline-block">
      <h3 className="mitblock-title">Activity Timeline</h3>
      <FilterDropdown
        eventsPacket={props.eventsPacket}
        getSortFilterValue={props.getSortFilterValue}
        filterTimestampSort={props.filterTimestampSort}
        getFilterSelectValue={props.getFilterSelectValue}
        filterTimestampValue={props.filterTimestampValue}
      />
      <Suspense fallback={<h3>Loading...</h3>}>
        <TimelineTable
          apiStatus={props.apiStatus}
          showAlert={props.showAlert}
          eventsPacket={props.eventsPacket}
          apiStatusCourse={props.apiStatusCourse}
          filterTimestampSort={props.filterTimestampSort}
        />
      </Suspense>
    </div>
  );
};

export default Timeline;


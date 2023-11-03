import "./style.scss";
import React, { useEffect, useState } from "react";

type Props = {
  blTimelineEvent: any;
};

const FilterDropdown = (props: Props) => {
  const [eventStatus, setEventStatus] = useState(false);
  // useEffect(() => {
  //   for(let i = 0; i < props.blTimelineEvent.length; i++){
  //     if(props.blTimelineEvent[i].events.length === 0){
  //       setEventStatus(true);
  //     }
  //   }
  //   // if (
  //   //   props.blTimelineEvent[0] !== undefined &&
  //   //   props.blTimelineEvent[0].events.length === 0
  //   // ) {
  //   //   setEventStatus(true);
  //   // }
  // }, [props.blTimelineEvent]);

  // console.log(eventStatus)

  return (
    <React.Fragment>
      <div className="d-flex block-filter">
        <ShortByDaysDropdowns
          eventStatus={eventStatus}
          blTimelineEvent={props.blTimelineEvent}
        />{" "}
        <ShortByDateDropdowns
          eventStatus={eventStatus}
          blTimelineEvent={props.blTimelineEvent}
        />
      </div>
    </React.Fragment>
  );
};

export default FilterDropdown;

const dropdown_style = {
  display: "inline",
  width: "auto",
};

const ShortByDaysDropdowns = ({ blTimelineEvent, eventStatus }: any) => {
  return (
    <select
      className="form-select form-select-sm me-2"
      aria-label="Default select example"
      defaultValue="Next 7 days"
      // disabled={blTimelineEvent.length === 0 || eventStatus !== false}
    >
      <option>Next 7 days</option>
      <option value="1">Next 30 days</option>
      <option value="2">Next 6 month</option>
    </select>
  );
};

const ShortByDateDropdowns = ({ blTimelineEvent, eventStatus }: any) => {
  return (
    <select
      className="form-select form-select-sm"
      aria-label="Default select example"
      defaultValue="Sort by date"
      // disabled={blTimelineEvent.length === 0 || eventStatus !== false}
    >
      <option>Sort by date</option>
      <option value="1">Sort by course</option>
    </select>
  );
};

import "./style.scss";
import React from "react";

type Props = {
  blTimelineEvent: any;
};

const FilterDropdown = (props: Props) => {

  const handlerChange = (value: any) => {
    console.log(value)
  }

  return (
    <React.Fragment>
      <div className="d-flex block-filter">
        <ShortByDaysDropdowns blTimelineEvent={props.blTimelineEvent} handlerChange={handlerChange} />{" "}
        <ShortByDateDropdowns blTimelineEvent={props.blTimelineEvent} handlerChange={handlerChange} />
      </div>
    </React.Fragment>
  );
};

export default FilterDropdown;

const ShortByDaysDropdowns = ({ blTimelineEvent, handlerChange }: any) => {
  return (
    <select
      defaultValue="Next 7 days"
      aria-label="Default select example"
      className="form-select form-select-sm me-2"
      disabled={blTimelineEvent.length === 0}
      onChange={(e) => handlerChange(e.target.value)}
    >
      <option value="7days">Next 7 days</option>
      <option value="30days">Next 30 days</option>
      <option value="6month">Next 6 month</option>
    </select>
  );
};

const ShortByDateDropdowns = ({ blTimelineEvent, handlerChange }: any) => {
  return (
    <select
      defaultValue="Sort by date"
      aria-label="Default select example"
      className="form-select form-select-sm"
      disabled={blTimelineEvent.length === 0}
      onChange={(e) => handlerChange(e.target.value)}
    >
      <option value="date">Sort by date</option>
      <option value="course">Sort by course</option>
    </select>
  );
};

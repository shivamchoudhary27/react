import "./style.scss";
import React from "react";

type Props = {
  blTimeline: any;
};

const FilterDropdown = (props: Props) => {
  return (
    <React.Fragment>
      <div className="d-flex block-filter">
        <ShortByDaysDropdowns blTimeline={props.blTimeline} />{" "}
        <ShortByDateDropdowns blTimeline={props.blTimeline} />
      </div>
    </React.Fragment>
  );
};

export default FilterDropdown;

const ShortByDaysDropdowns = ({blTimeline}: any) => {
  console.log(blTimeline)
  return (
    <select
      className="form-select form-select-sm me-2"
      aria-label="Default select example"
      defaultValue="Next 7 days"
      disabled={blTimeline.status === "recordnotfound"}
    >
      <option>Next 7 days</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  );
};

const ShortByDateDropdowns = ({blTimeline}: any) => {
  return (
    <select
      className="form-select form-select-sm"
      aria-label="Default select example"
      defaultValue="Sort by date"
      disabled={blTimeline.status === "recordnotfound"}
    >
      <option>Sort by date</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  );
};

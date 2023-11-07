import "./style.scss";
import React from "react";

type Props = {
  eventsPacket: any;
  getFilterSelectValue: any
};

const FilterDropdown: React.FC<Props> = (props) => {
  const handlerChange = (event: any) => {
    props.getFilterSelectValue(event)
  };

  return (
    <React.Fragment>
      <div className="d-flex block-filter">
        <ShortByDaysDropdowns
          eventsPacket={props.eventsPacket}
          handlerChange={handlerChange}
        />{" "}
        <ShortByDateDropdowns
          eventsPacket={props.eventsPacket}
          handlerChange={handlerChange}
        />
      </div>
    </React.Fragment>
  );
};

export default FilterDropdown;

const ShortByDaysDropdowns = ({ eventsPacket, handlerChange }: any) => {
  return (
    <select
      defaultValue="Next 7 days"
      aria-label="Default select example"
      className="form-select form-select-sm me-2"
      // disabled={eventsPacket.length === 0}
      onChange={(e) => handlerChange(e.target.value)}
    >
      <option value="all">All</option>
      <option value="overdue">Overdue</option>
      <option value="7days" selected={true}>Next 7 days</option>
      <option value="30days">Next 30 days</option>
    </select>
  );
};

const ShortByDateDropdowns = ({ eventsPacket, handlerChange }: any) => {
  return (
    <select
      defaultValue="Sort by date"
      aria-label="Default select example"
      className="form-select form-select-sm"
      // disabled={eventsPacket.length === 0}
      onChange={(e) => handlerChange(e.target.value)}
    >
      <option value="date">Sort by date</option>
      <option value="course">Sort by course</option>
    </select>
  );
};

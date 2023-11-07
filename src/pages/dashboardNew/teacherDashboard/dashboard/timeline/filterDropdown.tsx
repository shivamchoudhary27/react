import "./style.scss";
import React from "react";

type Props = {
  eventsPacket: any;
};

const FilterDropdown: React.FC<Props> = (props) => {
  const handlerChange = (value: any) => {
    console.log(value);
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

const dropdown_style = {
  display: "inline",
  width: "auto",
};

const ShortByDaysDropdowns = ({ eventsPacket, handlerChange }: any) => {
  return (
    <select
      className="form-select form-select-sm me-2"
      aria-label="Default select example"
      defaultValue="Next 7 days"
      disabled={eventsPacket.length === 0}
      onChange={(e) => handlerChange(e.target.value)}
    >
      <option value="7days">Next 7 days</option>
      <option value="30days">Next 30 days</option>
      <option value="6month">Next 6 month</option>
    </select>
  );
};

const ShortByDateDropdowns = ({ eventsPacket, handlerChange }: any) => {
  return (
    <select
      className="form-select form-select-sm"
      aria-label="Default select example"
      defaultValue="Sort by date"
      disabled={eventsPacket.length === 0}
      onChange={(e) => handlerChange(e.target.value)}
    >
      <option value="date">Sort by date</option>
      <option value="course">Sort by course</option>
    </select>
  );
};

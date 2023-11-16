import "./style.scss";
import React from "react";

type Props = {
  eventsPacket: any;
  getFilterSelectValue: any;
  filterTimestampValue: string;
  getSortFilterValue: any;
  filterTimestampSort: string;
};

const FilterDropdown: React.FC<Props> = (props) => {
  const handlerChange = ({ event, filterType }: any) => {
    if (event !== "") {
      if (filterType === "days") {
        props.getFilterSelectValue(event);
      } else {
        props.getSortFilterValue(event);
      }
    }
  };

  // console.log(props.eventsPacket)

  return (
    <React.Fragment>
      <div className="d-flex block-filter">
        <ShortByDaysDropdowns
          eventsPacket={props.eventsPacket}
          handlerChange={handlerChange}
          filterTimestampValue={props.filterTimestampValue}
        />{" "}
        <ShortByDateDropdowns
          eventsPacket={props.eventsPacket}
          handlerChange={handlerChange}
          filterTimestampSort={props.filterTimestampSort}
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

const ShortByDaysDropdowns = ({
  eventsPacket,
  handlerChange,
  filterTimestampValue,
}: any) => {
  return (
    <select
      className="form-select form-select-sm me-2"
      aria-label="Default select example"
      value={filterTimestampValue}
      // disabled={eventsPacket.length === 0}
      onChange={(e) =>
        handlerChange({ event: e.target.value, filterType: "days" })
      }
    >
      <option value="all">All</option>
      <option value="overdue">Overdue</option>
      <option value="7days">Next 7 days</option>
      <option value="30days">Next 30 days</option>
    </select>
  );
};

const ShortByDateDropdowns = ({
  eventsPacket,
  handlerChange,
  filterTimestampSort,
}: any) => {
  return (
    <select
      className="form-select form-select-sm"
      aria-label="Default select example"
      value={filterTimestampSort}
      // disabled={eventsPacket.length === 0}
      onChange={(e) =>
        handlerChange({ event: e.target.value, filterType: "sortBy" })
      }
    >
      <option value="date">Sort by date</option>
      <option value="course">Sort by course</option>
    </select>
  );
};

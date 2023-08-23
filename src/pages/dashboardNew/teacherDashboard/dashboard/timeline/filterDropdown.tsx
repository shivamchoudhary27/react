import React from "react";
import "./style.scss";

const FilterDropdown = () => {
  return (
    <>
      <div className="d-flex block-filter">
        <ShortByDaysDropdowns /> <ShortByDateDropdowns />
      </div>
    </>
  );
};

export default FilterDropdown;

const dropdown_style = {
  display: "inline",
  width: "auto",
};

const ShortByDaysDropdowns = () => {
  return (
    <select
      className="form-select form-select-sm me-2"
      aria-label="Default select example"
      defaultValue="Next 7 days"
    >
      <option>Next 7 days</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  );
};

const ShortByDateDropdowns = () => {
  return (
    <select
      className="form-select form-select-sm"
      aria-label="Default select example"
      defaultValue="Sort by date"
    >
      <option>Sort by date</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  );
};

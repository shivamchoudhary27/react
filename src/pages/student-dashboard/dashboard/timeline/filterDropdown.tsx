import React from "react";
import "./style.scss";

const FilterDropdown = () => {
  return (
    <>
      <div className="ui-dropdown-wrapper">
        <div className="ui-title">
          <h3>TIMELINE</h3>
        </div>
        <div className="ui-filter-dropdowns">
          <ShortByDaysDropdowns />{" "}<ShortByDateDropdowns />
        </div>
      </div>
    </>
  );
};

export default FilterDropdown;

const dropdown_style = {
  display: "inline",
  width: "auto"
}

const ShortByDaysDropdowns = () => {
  return (
    <select style={dropdown_style} className="form-select" aria-label="Default select example">
      <option selected>Next 7 days</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  );
};

const ShortByDateDropdowns = () => {
  return (
    <select style={dropdown_style} className="form-select" aria-label="Default select example">
      <option selected>Sort by date</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  );
};

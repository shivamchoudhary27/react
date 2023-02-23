import React from "react";

const FilterProgramDropdown = () => {
  return (
    <>
      <div className="ui-filter-dropdowns text-center">
        <strong>Filter By :</strong>{" "}
        <ShortBySemester />{" "}
        <ShortByStatus />
      </div>
    </>
  );
};

export default FilterProgramDropdown;

const dropdown_style = {
  display: "inline",
  width: "auto",
};

const ShortBySemester = () => {
  return (
    <select
      style={dropdown_style}
      className="form-select"
      aria-label="Default select example"
    >
      <option value="1" selected>Semester 4</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  );
};

const ShortByStatus = () => {
  return (
    <select
      style={dropdown_style}
      className="form-select"
      aria-label="Default select example"
    >
      <option value="1" selected>In Progress</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  );
};

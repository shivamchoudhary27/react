import React from "react";

const FilterProgramDropdown = () => {
  return (
    <>
      <div className="row program-filter">        
        <ShortBySemester />
        <ShortByStatus />
      </div>
    </>
  );
};

export default FilterProgramDropdown;

const ShortBySemester = () => {
  return (
    <div className="col-auto">
      <label>Semester</label>
      <select
        className="form-select"
        aria-label="Default select example"
        defaultValue="Semester 3"
        >
        <option value="1">Semester 3</option>
        <option value="2">Semester 2</option>
        <option value="3">Semester 1</option>
      </select>
    </div>
  );
};

const ShortByStatus = () => {
  return (
    <div className="col-auto">
      <label>Status</label>
      <select
        className="form-select"
        aria-label="Default select example"
        defaultValue="In Progress"
      >
        <option value="1">In-Progress</option>
        <option value="2">Not Started</option>
        <option value="3">Completed</option>      
      </select>
    </div>
  );
};

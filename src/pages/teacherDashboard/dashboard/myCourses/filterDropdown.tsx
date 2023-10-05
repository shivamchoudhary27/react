import React from "react";

const FilterProgramDropdown = () => {
  return (
    <>
      <div className="row program-filter">        
        <ShortByAcademic />
        <ShortByProgram />
        <ShortBySemester />
      </div>
    </>
  );
};

export default FilterProgramDropdown;

const ShortByAcademic = () => {
  return (
    <div className="col-auto">
      <label>Batch Year</label>
      <select
        className="form-select"
        aria-label="Default select example"
        defaultValue="2023-24"
        >
        <option value="1">2023-24</option>
        <option value="2">2022-23</option>
      </select>
    </div>
  );
};

const ShortByProgram = () => {
  return (
    <div className="col-auto">
      <label>Program</label>
      <select
        className="form-select"
        aria-label="Default select example"
        defaultValue="All"
        >
        <option value="1">All</option>
        <option value="1">Program 1</option>
        <option value="2">Program 2</option>
        <option value="3">Program 3</option>
      </select>
    </div>
  );
};

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


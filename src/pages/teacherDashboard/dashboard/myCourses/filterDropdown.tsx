import React from "react";

const MyCourses_Filter = () => {
  return (
    <>
      <div className="ui-CoursesFilter-dropdowns">
        <div>
          <ShortByAcadmicYear /> <ShortByDepartment /> <ShortByProgram />{" "}
          <ShortBySemester />
        </div>
        <div>
          <ShortByProgress />
        </div>
      </div>
    </>
  );
};

export default MyCourses_Filter;

const dropdown_style = {
  display: "inline",
  width: "auto",
};

const ShortByAcadmicYear = () => {
  return (
    <>
      <div className="d-inline-block">
        <label><strong>Academic Year</strong></label>
        <br />
        <select
          style={dropdown_style}
          className="form-select"
          aria-label="Default select example"
          defaultValue="2023-2024"
        >
          <option value="1">
            2023-2024
          </option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </>
  );
};

const ShortByDepartment = () => {
  return (
    <>
      <div className="d-inline-block">
        <label><strong>Department</strong></label>
        <br />
        <select
          style={dropdown_style}
          className="form-select"
          aria-label="Default select example"
          defaultValue="All"
        >
          <option value="1">
            All
          </option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </>
  );
};

const ShortByProgram = () => {
  return (
    <>
      <div className="d-inline-block">
        <label><strong>Program</strong></label>
        <br />
        <select
          style={dropdown_style}
          className="form-select"
          aria-label="Default select example"
          defaultValue="All"
        >
          <option value="1">
            All
          </option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </>
  );
};

const ShortBySemester = () => {
  return (
    <>
      <div className="d-inline-block">
        <label><strong>Semester</strong></label>
        <br />
        <select
          style={dropdown_style}
          className="form-select"
          aria-label="Default select example"
          defaultValue="All"
        >
          <option value="1">
            All
          </option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </>
  );
};

const ShortByProgress = () => {
  return (
    <select
      style={dropdown_style}
      className="form-select"
      aria-label="Default select example"
      defaultValue="In Progress"
    >
      <option value="1">
        In Progress
      </option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  );
};

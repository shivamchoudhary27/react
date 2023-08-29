import React from "react";

type Props = {
  getCourseStatus : (params: string) => void;
  coursesList?: any;
  departmentList?: any;
  batchList?: any;
  programList?: any;
  categoryList?: any;
};

const FilterProgramDropdown = (props: Props) => {

  console.log("coursesList--------",props.coursesList)
  return (
    <>
      <div className="row mt-3 mt-sm-0">
        <ShortByDepartment departmentList={props.coursesList.departments} getCourseStatus={function (params: string): void {
          throw new Error("Function not implemented.");
        } } />
        <ShortByBatchYear batchList={props.coursesList.programs} getCourseStatus={function (params: string): void {
          throw new Error("Function not implemented.");
        } } />
        <ShortByProgram programList={props.coursesList.programs} getCourseStatus={function (params: string): void {
          throw new Error("Function not implemented.");
        } } />
        <ShortByCategory categoryList={props.coursesList.courses} getCourseStatus={function (params: string): void {
          throw new Error("Function not implemented.");
        } } />
        <ShortByStatus getCourseStatus={props.getCourseStatus} />
      </div>
    </>
  );
};

export default FilterProgramDropdown;

// teacher department filter === >>>
const ShortByDepartment = (props: Props) => {
  return (
    <div className="col-auto">
      <label>Department</label>
      <select
        className="form-select"
        aria-label="Default select example"
        defaultValue="Semester 3"
      >
        {props.departmentList !== undefined &&
          Object.entries(props.departmentList).map(
            ([departmentId, departmentName]: any) => (
              <option key={departmentId} value={departmentId}>
                {departmentName}
              </option>
            )
          )}
      </select>
    </div>
  );
};

// teacher batch year filter === >>>
const ShortByBatchYear = (props: Props) => {
  return (
    <div className="col-auto">
      <label>Batch Year</label>
      <select
        className="form-select"
        aria-label="Default select example"
        defaultValue="Semester 3"
      >
        {props.batchList.map((item: any) => (
          <option key={item.id} value={item.batchYear}>
            {item.batchYear}
          </option>
        ))}
      </select>
    </div>
  );
};

// teacher program filter === >>>
const ShortByProgram = (props: Props) => {
  return (
    <div className="col-auto">
      <label>Program</label>
      <select
        className="form-select"
        aria-label="Default select example"
        defaultValue="Semester 3"
      >
        {props.programList.map((item: any) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

// teacher category filter === >>>
const ShortByCategory = (props: Props) => {
  return (
    <div className="col-auto">
      <label>Category</label>
      <select
        className="form-select"
        aria-label="Default select example"
        defaultValue="Semester 3"
      >
        {props.categoryList.map((item: any) => (
          <option key={item.categoryId} value={item.categoryId}>
            {item.categoryName}
          </option>
        ))}
      </select>
    </div>
  );
};

// teacher status filter === >>>
const ShortByStatus = (props: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.getCourseStatus(e.target.value);
  };

  return (
    <div className="col-auto">
      <label>Status</label>
      <select
        className="form-select"
        aria-label="Default select example"
        defaultValue="In Progress"
        onChange={handleChange}
      >
        <option value="progress">In-Progress</option>
        <option value="notStarted">Not Started</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};

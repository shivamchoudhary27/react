import React from "react";

type Props = {
  getCourseStatus: (params: string) => void;
  coursesList?: any;
};

const FilterProgramDropdown = (props: Props) => {
  console.log(props.coursesList);

  return (
    <>
      <div className="row mt-3 mt-sm-0">
        <ShortByBatchYear batchList={props.coursesList.programs} />
        <ShortByProgram programList={props.coursesList.programs} />
        <ShortByCategory categoryList={props.coursesList.courses} />
        <ShortByStatus getCourseStatus={props.getCourseStatus} />
      </div>
    </>
  );
};

export default FilterProgramDropdown;

// batch year filter === >>>
const ShortByBatchYear = (props: any) => {
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

// program filter === >>>
const ShortByProgram = (props: any) => {
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

// category filter === >>>
const ShortByCategory = (props: any) => {
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

// status filter === >>>
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

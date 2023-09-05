import React, { useState, useEffect, ChangeEventHandler } from "react";

type Props = {
  status?: string;
  batchList?: any;
  programList?: any;
  userCoursesData?: any;
  categoryList?: any;
  departmentList?: any;
  setUserCoursesData?: any;
  getCourseStatus?: (params: any) => void;
  getSelectedValue?: ChangeEventHandler<HTMLSelectElement> | undefined;
};

const FilterProgramDropdown = (props: Props) => {
  const [dummyDataObj, setDummyDataObj] = useState(props.userCoursesData !== undefined && props.userCoursesData);
  const [userEnrolData, setUserEnrolData] = useState(props.userCoursesData !== undefined && props.userCoursesData);
  const [departmentId, setDepartmentId] = useState(0);
  const [filterData, setFilterData] = useState({
    departmentId: 0,
    programId: 0,
    programs: [],
    courses: []
  })

  useEffect(() => {
    setUserEnrolData(props.userCoursesData);
  }, [props.userCoursesData]);

  useEffect(() => {
    if (userEnrolData !== undefined) {
      let departmentId = 0, programId = 0, programs = [], courses = [];

      const departmentKeys = Object.keys(userEnrolData.departments);

      if (departmentKeys.length > 0) {
        departmentId = parseInt(departmentKeys[0]);
        programs = userEnrolData.programs.filter((item) => item.department.id === departmentId);

        if (programs.length > 0) {
          programId = programs[0].id;
          courses = userEnrolData.courses.filter((item) => item.programId === programId);
        }
      }
      setFilterData({
        departmentId, programId, programs, courses
      });
    }
  }, [userEnrolData]);

  


  // console.log(dummyDataObj)
  console.log('userCoursesData set vi api', userEnrolData)


  useEffect(() => {
    <DynamicSelectors />;
  }, [dummyDataObj]);

  const DynamicSelectors = (props: Props) => {
    return (
      <React.Fragment>
        {
          filterData.programs.map((item: any) =>
          filterData.courses.map((el: any) => (
            <option key={item.id} value="">
                {props.status === "program"
                  ? item.name
                  : props.status === "batchYear"
                  ? item.batchYear
                  : props.status === "category" && el.categoryName}
              </option>
            ))
            )
        }
      </React.Fragment>
    );
  };
  // const DynamicSelectors = (props: Props) => {
  //   return (
  //     <React.Fragment>
  //       {dummyDataObj.programs !== undefined &&
  //         dummyDataObj.courses !== undefined &&
  //         dummyDataObj.departments !== undefined &&
  //         dummyDataObj.programs.map((item: any) =>
  //         dummyDataObj.courses.map((el: any) => (
  //           <option key={item.id} value="">
  //               {props.status === "program"
  //                 ? item.name
  //                 : props.status === "batchYear"
  //                 ? item.batchYear
  //                 : props.status === "category" && el.categoryName}
  //             </option>
  //           ))
  //           )}
  //     </React.Fragment>
  //   );
  // };

  const selectors = (id: any) => {
    console.log(dummyDataObj)
      const filteredProgram = dummyDataObj.programs.filter((item: any) => {
        return (item.department.id === parseInt(id))
      })
      const filteredCategory = dummyDataObj.courses.filter((item: any) => {
        return filteredProgram.some((elem: any) => elem.id === item.programId);
      });
      
      console.log(filteredProgram)
      console.log(filteredCategory)
      // props.setUserCoursesData({
      //   courses: filteredCategory,
      //   department: props.coursesList.departments,
      //   programs: filteredProgram,
      // })
  }

  const getSelectedValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id: any = e.target.value;
    selectors(id)
  };


  return (
    <>
      <div className="row mt-3 mt-sm-0">
        <SortByDepartment
          departmentList={userEnrolData}
          getSelectedValue={getSelectedValue}
        />
        <SortByBatchYear
          batchList={<DynamicSelectors status="batchYear" />}
          getSelectedValue={getSelectedValue}
        />
        <SortByProgram
          programList={<DynamicSelectors status="program" />}
          getSelectedValue={getSelectedValue}
        />
        <SortByCategory
          categoryList={<DynamicSelectors status="category" />}
          getSelectedValue={getSelectedValue}
        />
        <SortByStatus getCourseStatus={props.getCourseStatus} />
      </div>
    </>
  );
};

export default FilterProgramDropdown;

// teacher department filter === >>>
const SortByDepartment = (props: Props) => {

  console.log('props.departmentList', props.departmentList);
  return (
    <div className="col-auto">
      <label>Department</label>
      <select
        className="form-select"
        aria-label="Default select example"
        defaultValue="Semester 3"
        onChange={props.getSelectedValue}
      >
        {props.departmentList !== undefined &&
          Object.entries(props.departmentList.departments).map(
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
const SortByBatchYear = (props: Props) => {
  return (
    <div className="col-auto">
      <label>Batch Year</label>
      <select
        className="form-select"
        aria-label="Default select example"
        defaultValue="Semester 3"
        onChange={props.getSelectedValue}
      >
        {props.batchList}
      </select>
    </div>
  );
};

// teacher program filter === >>>
const SortByProgram = (props: Props) => {
  return (
    <div className="col-auto">
      <label>Program</label>
      <select
        className="form-select"
        aria-label="Default select example"
        defaultValue="Semester 3"
        onChange={props.getSelectedValue}
      >
        {props.programList}
      </select>
    </div>
  );
};

// teacher category filter === >>>
const SortByCategory = (props: Props) => {
  return (
    <div className="col-auto">
      <label>Category</label>
      <select
        className="form-select"
        aria-label="Default select example"
        defaultValue="Semester 3"
        onChange={props.getSelectedValue}
      >
        {props.categoryList}
      </select>
    </div>
  );
};

// teacher status filter === >>>
const SortByStatus = (props: Props) => {
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

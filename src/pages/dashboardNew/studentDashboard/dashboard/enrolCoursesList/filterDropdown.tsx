import React, { useState, useEffect, ChangeEventHandler } from "react";

type Props = {
  status?: string;
  batchList?: any;
  programList?: any;
  coursesList?: any;
  categoryList?: any;
  departmentList?: any;
  setUserCoursesData?: any;
  updateCourses?: any;
  enrolCoreCoursesObj: any
  getCourseStatus?: (params: any) => void;
  getSelectedValue?: ChangeEventHandler<HTMLSelectElement> | undefined;
};

const courseStatusOptions = [
  {id: 'inprogress', name: 'In Progress'},
  {id: 'completed', name: 'Completed'},
  {id: 'notstarted', name: 'Not Started'},
];

const departmentOptions = (departments: { [s: string]: unknown; } | ArrayLike<unknown>) => {
  return Object.entries(departments).map(([id, name]) => ({
    id: parseInt(id),
    name
  }));
}

const filterProgramOptions = (departmentId: number, allPrograms: any[]) => {
  if (departmentId === 0) return allPrograms;
  return allPrograms.filter(item => item.department.id === departmentId);
}

const filterBatchYearPrograms = (batchYear: string, programs: any[]) => {
  const intBatchYear = parseInt(batchYear);
  if (intBatchYear === 0) {
    return programs;
  }
  return programs.filter((item: { batchYear: any; }) => item.batchYear === batchYear);
}

const batchYearOptions = (programs: any[]) => {
  const uniqueBatchYears = new Set();

  // Iterate over the dataArray and add unique batch years to the Set
  programs.forEach((item) => {
    uniqueBatchYears.add(item.batchYear);
  });

  // Convert the Set to an array and map it to the desired format
  return Array.from(uniqueBatchYears).map((batchYear) => ({
    id: batchYear,
    name: batchYear,
  }));
}

const categoriesOptions = (programId: any, coursePacket: any[]) => {
  const filteredData = coursePacket.filter(item => item.programId === programId);

  const categoriesData = filteredData.map(item => ({
    id: item.categoryId,
    name: item.categoryName
  }));
  const trimDuplicateCategories = Array.from(new Set(categoriesData.map(JSON.stringify))).map(JSON.parse);
  return trimDuplicateCategories;
}


const FilterProgramDropdown = (props: Props) => {
  const [userEnrolData, setUserEnrolData] = useState({programs: [], courses: []});
  const [filteredStatusData, setFilteredStatusData] = useState([])
  const [filters, setFilters] = useState({
    selectedValues: {
      // department: 0,
      batchYear: 0,
      program: 0,
      category: 0,
      status: 0
    },
    filterData: {
      // departments: [],
      batchYears: [],
      programs: [],
      categories: [],
      status: courseStatusOptions,
    },
  });

  useEffect(() => {
    if (props.coursesList.courses.length > 0 && props.enrolCoreCoursesObj.length > 0) {
      let x: any = []
      let y = props.enrolCoreCoursesObj.filter((item: any) => {
        return props.coursesList.courses.some((el: any) => {
          return el.idNumber === item.id;
        });
      });
      // console.log(y);
      setFilteredStatusData(y)
    }
  }, [props.enrolCoreCoursesObj, props.coursesList]);
  
  const filterStatusCourse = (val: any) => {
    if(val !== ""){
      if(val === "completed"){
        return filteredStatusData.filter((item: any) => item.completed)
      }
      if(val === "inprogress"){
        return filteredStatusData.filter((item: any) => !item.completed && item.progress != null)
      }
      if(val === "notstarted"){
        return filteredStatusData.filter((item: any) => !item.completed && item.progress == null)
      }
    }
  }

  useEffect(() => {
    // let departmentPacket = departmentOptions(props.userCoursesData.departments);
    let batchYearsPackets = batchYearOptions(props.coursesList.programs);
    setFilters((prevFilterData: any) => ({
      ...prevFilterData,
      filterData: {
        ...prevFilterData.filterData,
        // departments: departmentPacket,
        programs: props.coursesList.programs,
        batchYears: batchYearsPackets
      }
    }));
    // setting up the whole original packet to a react state
    setUserEnrolData(props.coursesList);
  }, [props.coursesList]);

  useEffect(() => {
    if (props.updateCourses !== undefined) {
      props.updateCourses(filters);
    }
  }, [filters]);

  const getFilterChange = (value: any, component: string) => {
    let originalValue = value;
    value = parseInt(value);

    if (component === 'Status') {
      let filteredStatus = filterStatusCourse(originalValue);
      console.log(filteredStatus)
      setFilters((prevFilterData: any) => ({
        ...prevFilterData,
        selectedValues: {...prevFilterData.selectedValues, status: originalValue},
        // filterData: {...prevFilterData.filterData, status: filteredStatus}
      }));
    }
    
    if (component === 'Program') {

      let newCategories = categoriesOptions(value, userEnrolData.courses);
      
      setFilters((prevFilterData) => ({
        selectedValues: {...prevFilterData.selectedValues, program: value, category: 0},
        filterData: {...prevFilterData.filterData, categories: newCategories}
      }));

    } else if (component === 'Department') {

      // let newPrograms = filterProgramOptions(value, userEnrolData.programs);
      // let newBatchYears = batchYearOptions(newPrograms);

      // setFilters((prevFilterData: any) => ({
      //   selectedValues: {...prevFilterData.selectedValues, department: value, program: 0, category: 0, batchYear: 0},
      //   filterData: {...prevFilterData.filterData, programs: newPrograms, batchYears: newBatchYears}
      // }));

    } else if (component === 'Category') {

      setFilters((prevFilterData: any) => ({
        ...prevFilterData,
        selectedValues: {...prevFilterData.selectedValues, category: value}
      }));    

    } else if (component === 'Batch Year') {

      let filteredPrograms = filterBatchYearPrograms(originalValue, userEnrolData.programs);
      setFilters((prevFilterData: any) => ({
        selectedValues: {...prevFilterData.selectedValues, batchYear: originalValue, program: 0, category: 0},
        filterData: {...prevFilterData.filterData, programs: filteredPrograms}
      }));
    }
  }

  return (
    <div className="row program-filter">
      {/* <RenderFilterElements 
        component={"Department"} 
        filterPacket={filters.filterData.departments}
        packetKeys={["id", "name"]}
        getFilterChange={getFilterChange}
        currentValue={filters.selectedValues.department}
        filterDisable={false}
      /> */}
      <RenderFilterElements
        component={"Batch Year"}
        filterPacket={filters.filterData.batchYears}
        packetKeys={["id", "name"]}
        getFilterChange={getFilterChange}
        currentValue={filters.selectedValues.batchYear}
        filterDisable={false}
      />
      <RenderFilterElements
        component={"Program"}
        filterPacket={filters.filterData.programs}
        packetKeys={["id", "name"]}
        getFilterChange={getFilterChange}
        currentValue={filters.selectedValues.program}
        filterDisable={false}
      />
      <RenderFilterElements
        component={"Category"}
        filterPacket={filters.filterData.categories}
        packetKeys={["id", "name"]}
        getFilterChange={getFilterChange}
        currentValue={filters.selectedValues.category}
        filterDisable={filters.selectedValues.program === 0 ? true : false} // only enable when a single program is selected
      />
      <RenderFilterElements
        component={"Status"}
        filterPacket={filters.filterData.status}
        packetKeys={["id", "name"]}
        getFilterChange={getFilterChange}
        currentValue={filters.selectedValues.status}
        filterDisable={false}
      />
    </div>
  );
};

export default FilterProgramDropdown;

const RenderFilterElements = (props: any) => {
  
  const handleFilterChange = (e: any) => {
    props.getFilterChange(e.target.value, props.component);
  }

  return (
    <div className="col-auto">
      <label>{props.component}</label>
      <select
        className="form-select"
        aria-label="Default select example"
        value={props.currentValue}
        onChange={handleFilterChange}
        disabled={props.filterDisable}
      >
        <option value={0}>All</option>        
        {props.filterPacket.map(
          (el: any) => (
            <option key={el[props.packetKeys[0]]} value={el[props.packetKeys[0]]}>
              {el[props.packetKeys[1]]}
            </option>
          )
        )}
      </select>
    </div>
  );
}

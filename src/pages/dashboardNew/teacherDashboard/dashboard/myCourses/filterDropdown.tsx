import React, { useState, useEffect, ChangeEventHandler } from "react";

type Props = {
  status?: string;
  batchList?: any;
  programList?: any;
  userCoursesData?: any;
  categoryList?: any;
  departmentList?: any;
  setUserCoursesData?: any;
  updateCourses?: any;
  getCourseStatus?: (params: any) => void;
  getSelectedValue?: ChangeEventHandler<HTMLSelectElement> | undefined;
};

const courseStatusOptions = [
  {id: 'inprogress', name: 'In Progress'},
  {id: 'completed', name: 'Completed'},
  {id: 'notstarted', name: 'Not Started'},
];

const departmentOptions = (departments) => {
  if (departments !== undefined) {
    return Object.entries(departments).map(([id, name]) => ({
      id: parseInt(id),
      name
    }));
  }
  return [];
}

const filterProgramOptions = (departmentId, allPrograms) => {
  if (departmentId === 0) return allPrograms;
  return allPrograms.filter(item => item.department.id === departmentId);
}

const filterBatchYearPrograms = (batchYear, departmentId, programs) => {
  const intBatchYear = parseInt(batchYear);
  if (intBatchYear === 0) {
    console.log('returning all prorams');
    return programs;
  }
  if (departmentId === 0) {
    return programs.filter(item => item.batchYear === batchYear);    
  } else {
    return programs.filter(item => item.batchYear === batchYear && item.department.id === departmentId);
  }
}

const batchYearOptions = (programs) => {
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

const categoriesOptions = (programId, coursePacket) => {
  const filteredData = coursePacket.filter(item => item.programId === programId);

  const categoriesData = filteredData.map(item => ({
    id: item.categoryId,
    name: item.categoryName
  }));
  // return categoriesData;
  const trimDuplicateCategories = Array.from(new Set(categoriesData.map(JSON.stringify))).map(JSON.parse);
  return trimDuplicateCategories;
}

const FilterProgramDropdown = (props: Props) => {
  const [userEnrolData, setUserEnrolData] = useState({departments: {}, programs: [], courses: []});
  const [filters, setFilters] = useState({
    selectedValues: {
      department: 0,
      batchYear: 0,
      program: 0,
      category: 0,
      status: 0
    },
    filterData: {
      departments: [],
      batchYears: [],
      programs: [],
      categories: [],
      status: courseStatusOptions,
    },
  });

  useEffect(() => {
    let departmentPacket = departmentOptions(props.userCoursesData.departments);
    let batchYearsPackets = batchYearOptions(props.userCoursesData.programs);
    setFilters((prevFilterData: any) => ({
      ...prevFilterData,
      filterData: {
        ...prevFilterData.filterData,
        departments: departmentPacket,
        programs: props.userCoursesData.programs,
        batchYears: batchYearsPackets
      }
    }));
    // setting up the whole original packet to a react state
    setUserEnrolData(props.userCoursesData);
  }, [props.userCoursesData]);

  useEffect(() => {
    props.updateCourses(filters);
  }, [filters]);

  const getFilterChange = (value, component) => {
    let originalValue = value;
    value = parseInt(value);

    if (component === 'Status') {
      setFilters((prevFilterData: any) => ({
        ...prevFilterData,
        selectedValues: {...prevFilterData.selectedValues, status: originalValue}
      }));
    }
    
    if (component === 'Program') {

      let newCategories = categoriesOptions(value, userEnrolData.courses);
      
      setFilters((prevFilterData) => ({
        selectedValues: {...prevFilterData.selectedValues, program: value, category: 0},
        filterData: {...prevFilterData.filterData, categories: newCategories}
      }));

    } else if (component === 'Department') {

      let newPrograms = filterProgramOptions(value, userEnrolData.programs);
      let newBatchYears = batchYearOptions(newPrograms);

      setFilters((prevFilterData: any) => ({
        selectedValues: {...prevFilterData.selectedValues, department: value, program: 0, category: 0, batchYear: 0},
        filterData: {...prevFilterData.filterData, programs: newPrograms, batchYears: newBatchYears}
      }));

    } else if (component === 'Category') {

      setFilters((prevFilterData: any) => ({
        ...prevFilterData,
        selectedValues: {...prevFilterData.selectedValues, category: value}
      }));    

    } else if (component === 'Batch Year') {

      let filteredPrograms = filterBatchYearPrograms(originalValue, filters.selectedValues.department, userEnrolData.programs);
      setFilters((prevFilterData: any) => ({
        selectedValues: {...prevFilterData.selectedValues, batchYear: originalValue, program: 0, category: 0},
        filterData: {...prevFilterData.filterData, programs: filteredPrograms}
      }));
    }
  }

  return (
    <div className="row mt-3 mt-sm-0">
      <RenderFilterElements 
        component={"Department"} 
        filterPacket={filters.filterData.departments}
        packetKeys={["id", "name"]}
        getFilterChange={getFilterChange}
        currentValue={filters.selectedValues.department}
        filterDisable={false}
      />
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

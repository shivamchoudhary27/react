import React, { useState, useEffect } from "react";

type Props = {
  apiResponseData: any;
  updateCourses: any;
  setUrlArg: any;
};

// function to get department options === >>>
const departmentOptions = (departments: any) => {
  if (departments !== undefined) {
    return Object.entries(departments).map(([id, name]) => ({
      id: parseInt(id),
      name,
    }));
  }
  return [];
};

// function to get program options === >>>
const filterProgramOptions = (departmentId: any, allPrograms: any) => {
  if (departmentId === 0) return allPrograms;
  return allPrograms.filter(
    (item: { department: { id: any } }) => item.department.id === departmentId
  );
};

// function to filter batch year program === >>>
const filterBatchYearPrograms = (
  batchYear: string,
  departmentId: number,
  programs: any[]
) => {
  const intBatchYear = parseInt(batchYear);
  if (intBatchYear === 0) {
    console.log("returning all prorams");
    return programs;
  }
  if (departmentId === 0) {
    return programs.filter((item) => item.batchYear === batchYear);
  } else {
    return programs.filter(
      (item) =>
        item.batchYear === batchYear && item.department.id === departmentId
    );
  }
};

// function to get batch year options === >>>
const batchYearOptions = (programs: any) => {
  const uniqueBatchYears = new Set();

  // Iterate over the dataArray and add unique batch years to the Set
  programs.forEach((item: any) => {
    uniqueBatchYears.add(item.batchYear);
  });

  // Convert the Set to an array and map it to the desired format
  return Array.from(uniqueBatchYears).map((batchYear) => ({
    id: batchYear,
    name: batchYear,
  }));
};

// function to get category options === >>>
const categoriesOptions = (programId: any, coursePacket: any) => {
  const filteredData = coursePacket.filter(
    (item: { programId: any }) => item.programId === programId
  );

  const categoriesData = filteredData.map(
    (item: { categoryId: any; categoryName: any }) => ({
      id: item.categoryId,
      name: item.categoryName,
    })
  );
  // return categoriesData;
  const trimDuplicateCategories = Array.from(
    new Set(categoriesData.map(JSON.stringify))
  ).map(JSON.parse);
  return trimDuplicateCategories;
};
const MyTimelineFilterDropdown = (props: Props) => {
  console.log(props.apiResponseData?.programs[0]?.id)
  const [userEnrolData, setUserEnrolData] = useState({
    departments: {},
    programs: [],
    courses: [],
  });
  const [filters, setFilters] = useState({
    selectedValues: {
      department: 0,
      batchYear: 0,
      program: 0,
      category: 0,
    },
    filterData: {
      departments: 0,
      batchYears: 0,
      programs: [],
      categories: 0,
    },
  });

  useEffect(() => {
    let departmentPacket = departmentOptions(props.apiResponseData.departments);
    let batchYearsPackets = batchYearOptions(props.apiResponseData.programs);
    setFilters((prevFilterData: any) => ({
      ...prevFilterData,
      filterData: {
        ...prevFilterData.filterData,
        departments: departmentPacket,
        programs: props.apiResponseData.programs,
        batchYears: batchYearsPackets,
      },
    }));
    // setting up the whole original packet to a react state
    setUserEnrolData(props.apiResponseData);
  }, [props.apiResponseData]);

  useEffect(() => {
    props.updateCourses(filters);
  }, [filters]);

  const getFilterChange = (value: any, component: string) => {
    let originalValue = value;
    value = parseInt(value);

    if (component === "Program") {
      let newCategories = categoriesOptions(value, userEnrolData.courses);
      props.setUrlArg((preValue: any) => ({
        ...preValue,
        prgId: value
      }));
      setFilters((prevFilterData: any) => ({
        selectedValues: {
          ...prevFilterData.selectedValues,
          program: value,
          category: 0,
        },
        filterData: { ...prevFilterData.filterData, categories: newCategories },
      }));
    } else if (component === "Department") {
      let newPrograms = filterProgramOptions(value, userEnrolData.programs);
      let newBatchYears = batchYearOptions(newPrograms);
      props.setUrlArg((preValue: any) => ({
        ...preValue,
        dpt: value
      }));
      setFilters((prevFilterData: any) => ({
        selectedValues: {
          ...prevFilterData.selectedValues,
          department: value,
          program: 0,
          category: 0,
          batchYear: 0,
        },
        filterData: {
          ...prevFilterData.filterData,
          programs: newPrograms,
          batchYears: newBatchYears,
        },
      }));
    } else if (component === "Category") {
      setFilters((prevFilterData: any) => ({
        ...prevFilterData,
        selectedValues: { ...prevFilterData.selectedValues, category: value },
      }));
    }
    //  else if (component === "Academic Year") {
    //   let filteredPrograms = filterBatchYearPrograms(
    //     originalValue,
    //     filters.selectedValues.department,
    //     userEnrolData.programs
    //   );
    //   setFilters((prevFilterData: any) => ({
    //     selectedValues: {
    //       ...prevFilterData.selectedValues,
    //       batchYear: originalValue,
    //       program: 0,
    //       category: 0,
    //     },
    //     filterData: {
    //       ...prevFilterData.filterData,
    //       programs: filteredPrograms,
    //     },
    //   }));
    // }
  };

  return (
    <React.Fragment>
       <RenderFilterElements
        component={"Department"}
        filterPacket={filters.filterData.departments}
        packetKeys={["id", "name"]}
        getFilterChange={getFilterChange}
        currentValue={filters.selectedValues.department}
        filterDisable={false}
      />
      {/* <RenderFilterElements
        component={"Academic Year"}
        filterPacket={filters.filterData.batchYears}
        packetKeys={["id", "name"]}
        getFilterChange={getFilterChange}
        currentValue={filters.selectedValues.batchYear}
        filterDisable={false}
      />  */}
      <RenderFilterElements
        component={"Program"}
        filterPacket={filters.filterData.programs}
        packetKeys={["id", "name"]}
        getFilterChange={getFilterChange}
        currentValue={filters.selectedValues.program}
        filterDisable={false}
      />
      {/* <RenderFilterElements
        component={"Category"}
        filterPacket={filters.filterData.categories}
        packetKeys={["id", "name"]}
        getFilterChange={getFilterChange}
        currentValue={filters.selectedValues.category}
        filterDisable={filters.selectedValues.program === 0 ? true : false} // only enable when a single program is selected
      /> */}
    </React.Fragment>
  );
};

export default MyTimelineFilterDropdown;

const RenderFilterElements = (props: any) => {
  const handleFilterChange = (e: any) => {
    props.getFilterChange(e.target.value, props.component);
  };

  
  // Check if props.filterPacket is an array before calling map
  if (!Array.isArray(props.filterPacket)) {
    return null; // Or any fallback UI you want to render
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
        {props.addAllOption === undefined && <option value={0}>All</option>}
        {props.filterPacket !== undefined &&
          props.filterPacket.map((el: any) => (
            <option
              key={el[props.packetKeys[0]]}
              value={
                el[props.packetKeys[0]] !== null ? el[props.packetKeys[0]] : -1
              }
            >
              {el[props.packetKeys[1]]}
            </option>
          ))}
      </select>
    </div>
  );
};

export { RenderFilterElements };

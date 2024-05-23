import React, { useState, useEffect, ChangeEventHandler } from "react";

type Props = {
  StudentData?: any;
  setStudentId: any;
  userId: any;
};

const FilterProgramDropdownStudent = (props: Props) => {
  const [studentDetails, setStudentDetails] = useState([]);
  const [filters, setFilters] = useState({
    selectedValues: {
      student: 0,
    },
    filterData: {
      student: [],
    },
  });

  useEffect(() => {
    let data = [];
    if (props.StudentData?.length > 0) {
      props.StudentData?.map((el) => {
        data.push(el.user);
      });
    }
    setStudentDetails(data);
  }, [props.StudentData]);

  const getFilterChange = (value: any, component: any) => {
    let originalValue = value;
    value = parseInt(value);
    props.setStudentId(originalValue);
    if (component === "student") {
      setFilters((prevFilterData: any) => ({
        ...prevFilterData,
        selectedValues: {
          ...prevFilterData.selectedValues,
          student: originalValue,
        },
      }));
    }
  };

  return (
    <React.Fragment>
      <RenderFilterElements
        component={"student"}
        filterPacket={studentDetails}
        packetKeys={["id", "name"]}
        getFilterChange={getFilterChange}
        currentValue={filters.selectedValues.student}
        filterDisable={false}
      />
    </React.Fragment>
  );
};

export default FilterProgramDropdownStudent;

const RenderFilterElements = (props: any) => {
  const handleFilterChange = (e: any) => {
    props.getFilterChange(e.target.value, props.component);
  };

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
        {props.filterPacket.map((el: any) => (
          <option key={el.id} value={el.id}>
            {`${el.firstname} ${el.lastname}`}
          </option>
        ))}
      </select>
    </div>
  );
};

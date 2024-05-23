import React, { useState, useEffect } from "react";

type User = {
  id: number;
  firstname: string;
  lastname: string;
};

type StatusOption = {
  id: string;
  name: string;
};

type Props = {
  StudentData?: { user: User }[];
  setStudentId: (id: number) => void;
  setstatusfilter: (status: string) => void;
  userId: number;
};

type Filters = {
  selectedValues: {
    student: number;
    status: string;
  };
  filterData: {
    student: User[];
    status: StatusOption[];
  };
};

const courseStatusOptions: StatusOption[] = [
  { id: "inprogress", name: "In Progress" },
  { id: "completed", name: "Completed" },
  { id: "notstarted", name: "Not Started" },
];

const FilterProgramDropdownStudent: React.FC<Props> = ({
  StudentData,
  setStudentId,
  setstatusfilter,
  userId,
}) => {
  const [studentDetails, setStudentDetails] = useState<User[]>([]);
  const [filters, setFilters] = useState<Filters>({
    selectedValues: {
      student: userId,
      status: "0",
    },
    filterData: {
      student: [],
      status: courseStatusOptions,
    },
  });

  useEffect(() => {
    if (StudentData && StudentData.length > 0) {
      const data = StudentData.map((el) => el.user);
      setStudentDetails(data);
      setFilters((prevFilters) => ({
        ...prevFilters,
        filterData: { ...prevFilters.filterData, student: data },
      }));
    }
  }, [StudentData]);

  const getFilterChange = (value: string, component: string) => {
    if (component === "student") {
      const parsedValue = parseInt(value, 10);
      setStudentId(parsedValue);
      setFilters((prevFilters) => ({
        ...prevFilters,
        selectedValues: { ...prevFilters.selectedValues, student: parsedValue },
      }));
    } else if (component === "status") {
      setstatusfilter(value);
      setFilters((prevFilters) => ({
        ...prevFilters,
        selectedValues: { ...prevFilters.selectedValues, status: value },
      }));
    }
  };

  return (
    <>
      <div className="mitcomponet-heading filter-wrapper">
        <div className="row program-filter">
          <RenderFilterElements
            component="student"
            filterPacket={filters.filterData.student}
            packetKeys={["id", "firstname", "lastname"]}
            getFilterChange={getFilterChange}
            currentValue={filters.selectedValues.student}
            filterDisable={false}
          />
          <RenderFilterElements
            component="status"
            filterPacket={filters.filterData.status}
            packetKeys={["id", "name"]}
            getFilterChange={getFilterChange}
            currentValue={filters.selectedValues.status}
            filterDisable={false}
          />
        </div>
      </div>
    </>
  );
};

type RenderFilterElementsProps = {
  component: string;
  filterPacket: {
    id: number | string;
    firstname?: string;
    lastname?: string;
    name?: string;
  }[];
  packetKeys: string[];
  getFilterChange: (value: string, component: string) => void;
  currentValue: number | string;
  filterDisable: boolean;
};

const RenderFilterElements: React.FC<RenderFilterElementsProps> = ({
  component,
  filterPacket,
  getFilterChange,
  currentValue,
  filterDisable,
}) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    getFilterChange(e.target.value, component);
  };

  return (
    <div className="col-auto">
      <label>{component}</label>
      <select
        className="form-select"
        aria-label="Default select example"
        value={currentValue}
        onChange={handleFilterChange}
        disabled={filterDisable}
      >
         {component === "status" && <option value={0}>All</option>}
        {filterPacket.map((el) => (
          <option key={el.id} value={el.id}>
            {el.firstname ? `${el.firstname} ${el.lastname}` : el.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterProgramDropdownStudent;

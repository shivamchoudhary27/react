import React, {useState, useEffect} from "react";
import { makeGetDataRequest } from "../../../features/apiCalls/getdata";

const ProgramEnrollDropdown = ({updateDepartment}: any) => {
  const dummyData = {items: [], pager: {totalElements: 0, totalPages: 0}}
  const [departmentData, setDepartmentData] = useState<any>(dummyData);
  const filters = {pageNumber: 0, pageSize : 30};

  // department API call === >>>
  useEffect(() => {
    makeGetDataRequest('/1/departments', filters, setDepartmentData);
  }, []);

  const getCurrentValue = (e : any) => {
    updateDepartment(e.target.value);
  }

    return (
      <select className="form-select" aria-label="Default select example" onChange={getCurrentValue}>
        <option value="">All Departments</option>
        {departmentData.items.map((el: any, index: number) => (
            <option key={index} value={el.id}>{el.name}</option>
        ))}
      </select>
    );
  }
  
  export default ProgramEnrollDropdown;
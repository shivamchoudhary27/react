import { useState, useEffect } from "react";
import { makeGetDataRequest } from "../../../features/api_calls/getdata";

const ManageDropdown = ({ updatedepartment } : any) => {
  const [departmentData, setDepartmentData] = useState<any>([]);
  const filters = {pageNumber: 0, pageSize : 20};
  
  // department API call === >>>
  useEffect(() => {
    makeGetDataRequest('/departments', filters, setDepartmentData);
  }, []);

  const getCurrentValue = (e : any) => {
    updatedepartment(e.target.value);
  }

  return (
    <>
      <select className="form-select" onChange={getCurrentValue}>
        <option value="">All Departments</option>
        {departmentData.map((el: any, index: number) => (
            <option key={index} value={el.id}>{el.name}</option>
        ))}
      </select>
    </>
  );
}

export default ManageDropdown;

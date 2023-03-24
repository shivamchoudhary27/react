import { useState, useEffect } from "react";
import { makeGetDataRequest } from "../../../features/api_calls/getdata";

const ManageDropdown = ({ updatedepartment } : any) => {
  const dummyData = {items: [], pager: {totalElements: 0, totalPages: 0}}
  const [departmentData, setDepartmentData] = useState<any>(dummyData);
  const filters = {pageNumber: 0, pageSize : 30};
  
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
        {departmentData.items.map((el: any, index: number) => (
            <option key={index} value={el.id}>{el.name}</option>
        ))}
      </select>
    </>
  );
}

export default ManageDropdown;

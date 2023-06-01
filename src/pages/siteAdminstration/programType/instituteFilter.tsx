import React, {useState, useEffect} from "react";
import { makeGetDataRequest } from "../../../features/api_calls/getdata";

const InstituteFilter = ({updateDepartment}: any) => {
    const dummyData = {items: [], pager: {totalElements: 0, totalPages: 0}}
    const [departmentData, setDepartmentData] = useState<any>(dummyData);
    const filters = {pageNumber: 0, pageSize : 50};

    // department API call === >>>
    useEffect(() => {
      makeGetDataRequest('/institutes', filters, setDepartmentData);
    }, []);

    const getCurrentValue = (e : any) => {
        updateDepartment(e.target.value);
    }

    return (
      <select aria-label="Default select example" onChange={getCurrentValue}>
        <option value="">Institutes</option>
        {departmentData.items.map((el: any, index: number) => (
            <option key={index} value={el.id}>{el.name}</option>
        ))}
      </select>
    );
  }
  
  export default InstituteFilter;
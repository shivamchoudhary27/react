import { useState, useEffect } from "react";
import { getData as getDepartmentsData } from "../../../adapters/microservices";

const ManageDropdown = ({ updatedepartment }) => {
  const [departmentData, setDepartmentData] = useState<any>([]);
  
  // department API call === >>>
  useEffect(() => {
    const endPoint = "/departments";
    const apiParams = {
      pageNumber : 0,
      pageSize : 20,
      name : ''
    }
    getDepartmentsData(endPoint, apiParams)
      .then((result : any) => {
        if (result.data !== "" && result.status === 200) {
          setDepartmentData(result.data);
        }
      })
      .catch((err : any) => {
        console.log(err);
      });
  }, []);

  const getCurrentValue = (e : any) => {
    updatedepartment(e.target.value);
  }

  return (
    <>
      <select className="form-select" onChange={getCurrentValue}>
        <option value="" selected>All Departments</option>
        {departmentData.map((el: any, index: number) => (
            <option value={el.id}>{el.name}</option>
        ))}
      </select>
    </>
  );
}

export default ManageDropdown;

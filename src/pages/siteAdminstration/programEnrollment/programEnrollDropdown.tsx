import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeGetDataRequest } from "../../../features/apiCalls/getdata";
import { globalFilterActions } from "../../../store/slices/globalFilters";

const ProgramEnrollDropdown = ({updateDepartment, currentInstitute, selectedValue, setSelectedValue}: any) => {
  const dispatch = useDispatch();
  const selectedDepartment = useSelector(state => state.globalFilters.currentDepartmentFilterId);
  const dummyData = {items: [], pager: {totalElements: 0, totalPages: 0}}
  const [departmentData, setDepartmentData] = useState<any>(dummyData);
  const filters = {pageNumber: 0, pageSize : 30};
  
  // department API call === >>>
  useEffect(() => {
    if (currentInstitute > 0)
    makeGetDataRequest(`/${currentInstitute}/departments`, filters, setDepartmentData);
  }, [currentInstitute]);

  useEffect(() => {
    if (departmentData.items.length > 0) {
      setSelectedValue(selectedDepartment);
    }
  }, [departmentData]);

  const getCurrentValue = (e : any) => {
    updateDepartment(e.target.value);
    setSelectedValue(e.target.value);
    dispatch(globalFilterActions.currentDepartment(""))
  }

    return (
      <select className="form-select" onChange={getCurrentValue} value={selectedValue} >
        <option value="">All Departments</option>
        {departmentData.items.map((el: any, index: number) => (
            <option key={index} value={el.id}>{el.name}</option>
        ))}
      </select>
    );
  }
  
  export default ProgramEnrollDropdown;
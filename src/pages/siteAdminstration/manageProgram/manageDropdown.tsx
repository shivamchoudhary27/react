import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { makeGetDataRequest } from "../../../features/apiCalls/getdata";
import ACTIONSLIST from "../../../store/actions";

const ManageDropdown = ({ updatedepartment, currentInstitute } : any) => {
  const dispatch = useDispatch();
  const selectedDepartment = useSelector(state => state.currentDepartmentFilterId);
  const dummyData = {items: [], pager: {totalElements: 0, totalPages: 0}}
  const [departmentData, setDepartmentData] = useState<any>(dummyData);
  const filters = {pageNumber: 0, pageSize : 30};
  const [selectedValue, setSelectedValue] = useState('');
  
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
    updatedepartment(e.target.value);
    setSelectedValue(e.target.value);
    dispatch({type: ACTIONSLIST.currentDepartmentFilterId, departmentId: ""});
  }

  return (
    <>
      <select className="form-select" onChange={getCurrentValue} value={selectedValue} >
        <option value="">All Departments</option>
        {departmentData.items.map((el: any, index: number) => (
            <option key={index} value={el.id}>{el.name}</option>
        ))}
      </select>
    </>
  );
}

export default ManageDropdown;

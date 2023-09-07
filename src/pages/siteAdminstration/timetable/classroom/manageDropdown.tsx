import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { globalFilterActions } from "../../../../store/slices/globalFilters";

const ManageDropdown = ({ updateClassroomFilter, departmentList } : any) => {
  const dispatch = useDispatch();
  const selectedDepartment = useSelector(state => state.globalFilters.currentDepartmentFilterId);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    if (departmentList.length > 0) {
      setSelectedValue(selectedDepartment);
    }
  }, [departmentList]);

  const getCurrentValue = (e : any) => {
    updateClassroomFilter(e.target.value);
    setSelectedValue(e.target.value);
    dispatch(globalFilterActions.currentDepartment(""))
  }

  return (
    <>
      <select className="form-select" onChange={getCurrentValue} value={selectedValue} >
        <option value="">All Departments</option>
        {departmentList.map((el: any, index: number) => (
            <option key={index} value={el.id}>{el.name}</option>
        ))}
      </select>
    </>
  );
}

export default ManageDropdown;

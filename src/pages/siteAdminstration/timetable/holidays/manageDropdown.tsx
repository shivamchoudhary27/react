import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { globalFilterActions } from "../../../../store/slices/globalFilters";

const ManageDropdown = ({ updateHolidaysFilter, yearOptions } : any) => {
  const dispatch = useDispatch();
  const selectedYear = useSelector(state => state.globalFilters.currentDepartmentFilterId);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    if (yearOptions.length > 0) {
      setSelectedValue(selectedYear);
    }
  }, [yearOptions]);

  const getCurrentValue = (e : any) => {
    updateHolidaysFilter(e.target.value);
    setSelectedValue(e.target.value);
    dispatch(globalFilterActions.currentDepartment(""))
  }

  return (
    <>
      <select className="form-select" onChange={getCurrentValue} value={selectedValue} >
        <option value="">All Academic Year</option>
        {yearOptions.map((el: any, index: number) => (
            <option key={index} value={el.id}>{el.name}</option>
        ))}
      </select>
    </>
  );
}

export default ManageDropdown;

import { useState, useEffect } from "react";

const ManageDropdown = ({ updateHolidaysFilter, yearOptions, setSelectedValue, selectedValue } : any) => {
  // const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    if (yearOptions.length > 0) {
      setSelectedValue(selectedValue);
    }
  }, [yearOptions]);

  const getCurrentValue = (e : any) => {
    updateHolidaysFilter(e.target.value);
    setSelectedValue(e.target.value);
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

import { useEffect } from "react";

const ManageDropdown = ({ updateClassroomFilter, departmentList, setSelectedValue, selectedValue } : any) => {

  useEffect(() => {
    if (departmentList.length > 0) {
      setSelectedValue(setSelectedValue);
    }
  }, [departmentList]);

  const getCurrentValue = (e : any) => {
    updateClassroomFilter(e.target.value);
    setSelectedValue(e.target.value);
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

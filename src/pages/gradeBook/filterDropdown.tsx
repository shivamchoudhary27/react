import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { makeGetDataRequest } from "../../features/apiCalls/getdata";
import ACTIONSLIST from "../../store/actions";

const FilterDropdown = ({ currentInstitute, name, options } : any) => {
  const [selectedValue, setSelectedValue] = useState('');
  
  // department API call === >>>
  // useEffect(() => {
  //   if (currentInstitute > 0)
  //   makeGetDataRequest(`/${currentInstitute}/departments`, filters, setDepartmentData);
  // }, [currentInstitute]);

  useEffect(() => {
    if (options !== undefined && options.length > 0) {
      setSelectedValue(options);
    }
  }, [options]);

  const getCurrentValue = (e : any) => {
    console.log("updated value--------- id:", e.target.value)
    setSelectedValue(e.target.value);
  }

  return (
    <>
      <select className="form-select" onChange={getCurrentValue} value={selectedValue} >
        <option value="">{name}</option>
        {options !== undefined && options.map((el: any, index: number) => (
            <option key={index} value={el.id}>{el.fullname}</option>
        ))}
      </select>
    </>
  );
}

export default FilterDropdown;

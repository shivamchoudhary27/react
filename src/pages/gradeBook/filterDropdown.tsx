import React from "react";
import { useState, useEffect } from "react";

export const SemesterFilterDropdown = ({ options } : any) => {
  const [selectedSemesterValue, setSelectedSemesterValue] = useState('');

  useEffect(() => {
    if (options !== undefined && options.length > 0) {
      setSelectedSemesterValue(options);
    }
  }, [options]);

  const getCurrentValue = (e : any) => {
    console.log("updated value--------- id:", e.target.value)
    setSelectedSemesterValue(e.target.value)
  }

  return (
    <React.Fragment>
      <select className="form-select" onChange={getCurrentValue} value={selectedSemesterValue} >
        <option value="">All Semester</option>
        {options.map((el: any, index: number) => (
            <option key={index} value={el.id}>{el.name}</option>
        ))}
      </select>
    </React.Fragment>
  );
}

export const CourseFilterDropdown = ({options, getCourseId, courseId}: any) => {

  const getCurrentValue = (e : any) => {
    console.log(e.target.value)
    getCourseId(e.target.value)
  }

  return(
    <React.Fragment>
      <select className="form-select" onChange={getCurrentValue} value={courseId} >
        <option value={""}>Select Course</option>
        {options.length > 0 && options.map((el: any, index: number) => (
            <option key={index} value={el.idNumber !== null ? el.idNumber : 0}>{el.name}</option>
        ))}
      </select>
    </React.Fragment>
  )
}

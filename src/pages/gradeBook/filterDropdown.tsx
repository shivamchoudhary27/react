import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { makeGetDataRequest } from "../../features/apiCalls/getdata";
import ACTIONSLIST from "../../store/actions";

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

export const CourseFilterDropdown = ({options, getCourseId}: any) => {
  const [selectedCourseValue, setSelectedCourseValue] = useState('');

  useEffect(() => {
    if (options !== undefined && options.length > 0) {
      setSelectedCourseValue(options);
    }
  }, [options]);

  const getCurrentValue = (e : any) => {
    getCourseId(e.target.value)
    setSelectedCourseValue(e.target.value)
  }
  return(
    <React.Fragment>
      <select className="form-select" onChange={getCurrentValue} value={selectedCourseValue} >
        <option value={""}>All Courses</option>
        {options.map((el: any, index: number) => (
            <option key={index} value={el.id}>{el.fullname}</option>
        ))}
      </select>
    </React.Fragment>
  )
}

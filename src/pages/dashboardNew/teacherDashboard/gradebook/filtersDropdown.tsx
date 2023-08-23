import React, { useState } from "react";

type Props = {
  options: any[];
  name: string;
};

const FiltersDropdown = ({ options, name }: Props) => {
  const [selectedSemesterValue, setSelectedSemesterValue] = useState("");

  const getCurrentValue = (e: any) => {
    console.log("updated value--------- id:", e.target.value);
    setSelectedSemesterValue(e.target.value);
  };

  return (
    <React.Fragment>
      <label>{name}</label>
      <select
        className="form-select"
        onChange={getCurrentValue}
        value={selectedSemesterValue}
      >
        <option value={""}>Select {name}</option>
        {options.length > 0 &&
          options.map((el: any, index: number) => (
            <option key={index} value={el.id}>
              {el.name}
            </option>
          ))}
      </select>
    </React.Fragment>
  );
};

export default FiltersDropdown;

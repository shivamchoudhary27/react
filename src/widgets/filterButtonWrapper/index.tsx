import React, { useState } from 'react';
import filterIcon from '../../assets/images/icons/mb-filterIcon.svg';
import "./style.scss";
const FilterButtonWrapper = ({ children }) => {
  const [showFilterDropdown, setShowFilterDropdown] = useState(true);

  const toggleFilterDropdown = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };

  return (
    <div>
      <div className='d-flex justify-content-end'>
      <button onClick={toggleFilterDropdown} className="filter-btn">
        <img src={filterIcon} alt="filter-icon" />
      </button>
      </div>
      <div className={showFilterDropdown ? "FilterProgramDropdown-wrapper" : "FilterProgramDropdown-wrapper hidden"}>
        {children}
      </div>
    </div>
  );
};

export default FilterButtonWrapper;

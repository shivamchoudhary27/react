import React from "react";

const SortByComp = ({ filterToggle, setFilterToggle }: any) => {
  return (
    <React.Fragment>
      <div>
        <ul className="filter-items">
          <li>
            <p
              className="filter-text"
              onClick={() => setFilterToggle(!filterToggle)}
            >
              <i className="fa fa-filter filter-icon" /> Filter
            </p>
          </li>
          <li>
            <p className="filter-text">
              {" "}
              <span className="sort-by-filter">Sort By:</span> Recommended{" "}
              <i className="fa fa-angle-down angle-down-icon" />
            </p>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default SortByComp;

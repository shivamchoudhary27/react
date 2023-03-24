import React, { useState } from "react";
import "./style.scss";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Filter = ({
  toggleModalShow,
  resetDepartmentForm,
  departmentData,
  setDepartmentData,
  refreshDepartmentData,
  updateInputFilters
}: any) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: any) => {
    e.preventDefault();
  };

  const getInputValues = () => {
    updateInputFilters(searchValue);
  }

  const resetHandler = () => {
    updateInputFilters("");
    setSearchValue("");
  }

  // handle to open Add Department modal === >>>
  const openAddDepartment = () => {
    toggleModalShow(true);
    resetDepartmentForm(true);
  };

  return (
    <>
      <div className="filter-wrapper">
        <div className="filter-form">
          <form onSubmit={handleSearch}>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                />
              </div>
              <div className="col-auto">
                <Button variant="outline-secondary" onClick={()=>getInputValues()}>
                  Filter
                </Button>{" "}
                <Button
                  variant="outline-secondary"
                  onClick={() => resetHandler()}
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="mt-2">
          <Button variant="primary" onClick={openAddDepartment}>
            Add Department
          </Button>{" "}
          <Button
            variant="outline-secondary"
            onClick={() => navigate("/manageprogram")}
          >
            Go back
          </Button>
        </div>
      </div>
    </>
  );
};

export default Filter;

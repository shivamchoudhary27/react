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
}: any) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  // search input Handler === >>>
  const handleInput = (val: string) => {
    refreshDepartmentData(false);
    var lowerCase = val.toLowerCase();
    setSearchValue(lowerCase);
  };

  // on search event handler === >>>
  const filterHandler = () => {
    const filteredData = departmentData.filter((el: any) => {
      if (searchValue === "") {
        refreshDepartmentData(false);
        return el;
      } else {
        return el.name.toLowerCase().includes(searchValue);
      }
    });
    if(filteredData.length === 0){
      alert('no record found');
      refreshDepartmentData(true)
    }
    setDepartmentData(filteredData);
  };

  // handle to open Add Department modal === >>>
  const openAddDepartment = () => {
    toggleModalShow(true);
    resetDepartmentForm();
  };

  return (
    <>
      <div className="filter-wrapper">
        <div className="filter-form">
          <form>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  onChange={(e) => handleInput(e.target.value)}
                />
              </div>
              <div className="col-auto">
                <Button variant="outline-secondary" onClick={filterHandler}>
                  Filter
                </Button>{" "}
                <Button
                  variant="outline-secondary"
                  type="reset"
                  onClick={() => refreshDepartmentData(true)}
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div>
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

import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Filter = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div className="filter-wrapper">
        <div className="filter-form">
          <form>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  //   onChange={(e) => setSearchValue(e.target.value)}
                  //   value={searchValue}
                />
              </div>
              <div className="col-auto">
                <Button variant="outline-secondary">Filter</Button>{" "}
                <Button
                  variant="outline-secondary"
                  //   onClick={() => resetHandler()}
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="mt-2">
          <Button variant="primary" onClick={()=>navigate("/addusersform")}>Add Users</Button>{" "}
          <Button
            variant="outline-secondary"
            onClick={() => navigate("/siteadmin")}
          >
            Go back 
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filter;

import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddTags = ({ toggleModalShow, setTagObj, updateInputFilters }: any) => {
  const navigate = useNavigate();

  const addTagsHandler = () => {
    toggleModalShow(true);
    setTagObj({ id: 0, name: "" });
  };

  return (
    <React.Fragment>
      <div className="filter-wrapper">
        <form>
          <div className="row">
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                // onChange={(e) => setSearchValue(e.target.value)}
                // value={searchValue}
              />
            </div>
            <div className="col-auto">
              <Button variant="primary" className="me-2">Filter</Button>{" "}
              <Button
                variant="outline-secondary"
                // onClick={() => resetHandler()}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
        <Button variant="primary" onClick={addTagsHandler}>
          Add Tags
        </Button>
      </div>
    </React.Fragment>
  );
};

export default AddTags;

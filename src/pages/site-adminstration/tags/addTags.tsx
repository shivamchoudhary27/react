import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddTags = ({toggleModalShow}: any) => {
    const navigate = useNavigate();
    const addTagsHandler = () => {
        toggleModalShow(true)
    }

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
                />
              </div>
              <div className="col-auto">
                <Button variant="outline-secondary">
                  Filter
                </Button>{" "}
                <Button
                  variant="outline-secondary"
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="mt-2">
          <Button variant="primary" onClick={addTagsHandler}>
            Add Tags
          </Button>{" "}
          <Button
            variant="outline-secondary" onClick={()=>navigate("/manageprogram")}
          >
            Go back
          </Button>
        </div>
      </div>
    </>
  )
}

export default AddTags;
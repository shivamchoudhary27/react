import React, {useState} from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddTags = ({toggleModalShow, setTagObj, updateInputFilters}: any) => {
    const navigate = useNavigate();

    const addTagsHandler = () => {
        toggleModalShow(true)
        setTagObj({ id: 0, name: ""});
    }

  return (
    <>
        <div className="filter-wrapper">
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
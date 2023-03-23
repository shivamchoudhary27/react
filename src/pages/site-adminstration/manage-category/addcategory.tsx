import React, {useState} from "react";
import { Link } from "react-router-dom";
import CategoryModal from "./categoryModal";

const Addcategory = ({ latestparentweight }) => {
  const [modalShow, setModalShow] = useState(false);
  const toAddWeight = latestparentweight;
  const parent = 0;

  // console.log(toAddWeight);
  
  const addCategoryHandler = () => {
    setModalShow(true)
  }

  return (
    <>
      <div>
        <Link to="" style={{textDecoration: 'none'}} onClick={addCategoryHandler}>
          <i className="fa-solid fa-square-plus"></i>{" "}
          <strong>Add Category</strong>{" "}
        </Link>
      </div>
      <CategoryModal 
        show={modalShow}
        onHide={() => setModalShow(false)} 
        weight={toAddWeight}
        parent={parent}
      />
    </>
  );
};

export default Addcategory;

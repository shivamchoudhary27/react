import React, {useState} from "react";
import { Link } from "react-router-dom";
import CategoryModal from "./categoryModal";

const Addcategory = () => {
  const [modalShow, setModalShow] = useState(false);

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
      <CategoryModal show={modalShow}
      onHide={() => setModalShow(false)} />
    </>
  );
};

export default Addcategory;

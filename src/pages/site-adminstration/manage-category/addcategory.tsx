import React, {useState} from "react";
import { Link } from "react-router-dom";
import CategoryModal from "./categoryModal";

const Addcategory = ({ latestparentweight, refreshCategoryTable, toggleModalShow, modalShow }: any) => {
  
  const toAddWeight = latestparentweight;
  const parent = 0;
  
  // handle to add new category === >>
  const addCategoryHandler = () => {
    refreshCategoryTable(false);
    toggleModalShow(true);
    refreshCategoryTable(true)
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
        toggleModalShow={toggleModalShow}
        onHide={() => toggleModalShow(false)} 
        weight={toAddWeight}
        parent={parent}
      />
    </>
  );
};

export default Addcategory;

// import { useFormik } from "formik";
import React from "react";
// import ManageDropdown from "./manageDropdown";
import { Button} from "react-bootstrap";
// import { filterConfig } from "../../../../utils/filterTimeout";

// const initialValues = {
//   name: "",
// };

const Filters = ({
  departmentList,
  toggleModalShow,
  updateInputFilters,
  resetClassroomForm,
  updateClassroomFilter,
}: any) => {

  // handle to open Add Department modal === >>>
  const openAddSlot = () => {
    toggleModalShow(true);
    resetClassroomForm(true);
  };

  return (
    <React.Fragment>
      <div className="filter-wrapper mt-2">
        <div className="site-button-group">
          <Button variant="primary" onClick={openAddSlot}>
            Add Slot
          </Button>{" "}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filters;

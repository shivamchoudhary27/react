import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import ModuleTable from "./moduleTable";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const initialValues = {
  site: "#7A9D54",
  category: "#461959",
  course: "#1D5D9B",
  user: "#A1CCD1",
  attendance: "#35A29F",
  forum: "#A076F9",
  quiz: "#A78295",
  workshop: "#FF9B9B",
  assignment: "#E7B10A",
  page: "#A76F6F",
  book: "#2B2730",
};

const ModuleList = () => {
  const initialColors =
  (localStorage.getItem("event-colors") !== null)
  ? JSON.parse(localStorage.getItem("event-colors"))
  : initialValues;

  const [initialFormColors, setInitialFormColors] = useState(initialColors);
  
  const resetHandler = () => {
    setInitialFormColors(initialValues);
  }

  return (
    <>
      <Formik
        initialValues={initialFormColors}
        enableReinitialize={true}
        onSubmit={(values) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Color Added Successfully!",
            showConfirmButton: false,
            timer: 1500
          });
          const moduleColorsList = JSON.stringify(values)
          localStorage.setItem('event-colors' , moduleColorsList)
        }}
      >
        {() => (
          <Form>
            <ModuleTable Field={Field} />
            {/* <div className="text-center mt-4"><Button type="submit">Save</Button></div> */}
            <div className="text-center mt-4">
              <Button type="submit">Save</Button>{" "}
              <Button
                variant="outline-secondary"
                type="reset"
                onClick={resetHandler}
              >
                Reset
              </Button>
            </div>

          </Form>
        )}
      </Formik>
    </>
  );
};

export default ModuleList;

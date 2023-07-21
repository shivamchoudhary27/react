import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import ModuleTable from "./moduleTable";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const initialValues = {
  site: "#0E79EC",
  category: "#166EE6",
  course: "#0C62E2",
  user: "#1089F3",
  quiz: "#0D71E9",
  assignment: "#0E6DE7",
  workshop: "#0C67E5",
  attendance: "#0C65E3",
  forum: "#317FE9",  
  page: "#70A9F1",
  book: "#00000",
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

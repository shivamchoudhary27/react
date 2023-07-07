import React from "react";
import { Formik, Form, Field } from "formik";
import ModuleTable from "./moduleTable";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const initialValues = {
  site: "#DC0000",
  category: "#7BE7FF",
  course: "#95BDFF",
  user: "#395B64",
  attendance: "#12862C",
  forum: "#F16913",
  quiz: "#454849",
  workshop: "#880A0A",
  assignment: "#A61826",
  page: "#A9A9A9",
  book: "#FF7B7B",
};

const ModuleList = () => {
  const initialColors =
    (localStorage.getItem("event-colors") !== null)
      ? JSON.parse(localStorage.getItem("event-colors"))
      : initialValues;
  
  return (
    <>
      <Formik
        initialValues={initialColors}
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
            <div className="text-center mt-4"><Button type="submit">Save</Button></div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ModuleList;

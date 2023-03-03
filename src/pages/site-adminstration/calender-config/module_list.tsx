import React from "react";
import { Formik, Form, Field } from "formik";
import Module_Table from "./module_table";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const initialValues = {
  user: "red",
  course: "blue",
  site: "green",
  category: "pink",
  attendance: "lightgrey",
  forum: "red",
  quiz: "darkyellow",
  workshop: "blue",
  assignment: "green",
  page: "gray",
  book: "black",
};

const Module_List = () => {
  const initialColors =
    (localStorage.getItem("event-colors") !== null)
      ? JSON.parse(localStorage.getItem("event-colors"))
      : initialValues;
  
  return (
    <>
      <Formik
        initialValues={initialColors}
        onSubmit={(values) => {
          console.log(values);
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
            <Module_Table Field={Field} />
            <Button type="submit">
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Module_List;

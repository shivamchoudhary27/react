import React from "react";
import { Formik, Form, Field } from "formik";
import Module_Table from "./moduleTable";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const initialValues = {
  user: "#395B64",
  course: "#95BDFF",
  site: "#698269",
  category: "#AA5656",
  attendance: "#81B214",
  forum: "#E4C988",
  quiz: "#820000",
  workshop: "#4E6C50",
  assignment: "#CB1C8D",
  page: "#460C68",
  book: "#C27664",
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
            <div className="text-center mt-3"><Button type="submit">Save</Button></div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Module_List;

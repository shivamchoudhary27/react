import React from "react";
import { Formik, Form, Field } from "formik";
import Module_Table from "./module_table";
import { Button } from "react-bootstrap";

const initialValues = {
  user: "red",
  course: "blue",
  site: "green",
  category: "pink",
  forum: "red",
  quiz: "yellow",
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
          const moduleColorsList = JSON.stringify(values)
          localStorage.setItem('event-colors' , moduleColorsList)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Module_Table Field={Field} />
            <Button type="submit" disabled={isSubmitting}>
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Module_List;

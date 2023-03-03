import React from "react";
import { Formik, Form, Field } from "formik";
import Module_Table from "./module_table";
import { Button } from "react-bootstrap";

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

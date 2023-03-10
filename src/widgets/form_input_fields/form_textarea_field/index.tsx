import React from "react";
import { Field } from "formik";

const FieldTypeTextarea = ({
  id = "",
  component="",
  name = "",
  placeholder = "",
  className = "form-control",
}) => {
  return (
    <>
      <Field
        id={id}
        name={name}
        className={className}
        placeholder={placeholder}
        component={component}
      />
    </>
  );
};

export default FieldTypeTextarea;
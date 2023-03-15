import React from "react";
import { Field } from "formik";

const FieldTypeText = ({
  id,
  name,
  placeholder,
  type = "text",
  className = "form-control",
}: any) => {
  return (
    <>
      <Field
        id={id}
        name={name}
        type={type}
        className={className}
        placeholder={placeholder}
      />
    </>
  );
};

export default FieldTypeText;

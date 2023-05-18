import React from "react";
import { Field } from "formik";

const FieldTypeCheckbox = ({
  name,
  type = "checkbox",
  value,
  checkboxLabel,
  className = "form-check-input",
  onClick
}: any) => {
  return (
    <>
      <label>
        <Field name={name} type={type} value={value} className={className} onClick={onClick} />{" "}
        {checkboxLabel}
      </label>
    </>
  );
};

export default FieldTypeCheckbox;

import React from "react";
import { Field } from "formik";

const FieldTypeRadio = ({
  type = "radio",
  name,
  value,
  radioText,
  checked,
  onChange,
}: any) => {
  return (
    <label className="mx-2">
      <Field
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />{" "}
      {radioText}
    </label>
  );
};

export default FieldTypeRadio;

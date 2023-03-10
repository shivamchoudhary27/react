import React from "react";
import { Field } from "formik";

const FieldTypeRadio = ({
    type="radio",
    name,
    value,
    radioText
}: any) => {
  return (
    <label className="mx-2">
      <Field type={type} name={name} value={value} /> {radioText}
    </label>
  );
};

export default FieldTypeRadio;

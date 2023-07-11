import React from "react";
import { Field } from "formik";

const FieldTypeFile = ({
  id,
  name,
  placeholder,
  type = "file",
//   className,
  disabled,
}: any) => {
  return (
    <React.Fragment>
      <Field
        id={id}
        name={name}
        type={type}
        className="form-control"
        placeholder={placeholder}
        disabled={disabled}
      />
    </React.Fragment>
  );
};

export default FieldTypeFile;

import React from "react";
import { Field } from "formik";

const FieldTypeTextarea = ({
  id = "",
  component = "",
  name = "",
  placeholder = "",
  className = "form-control",
  onChange,
  flag = false,
}: any) => {
  return (
    <>
      {flag !== true ? (
        <Field
          id={id}
          name={name}
          className={className}
          placeholder={placeholder}
          component={component}
        />
      ) : (
        <Field
          id={id}
          name={name}
          as="textarea"
          placeholder={placeholder}
          component={component}
          onChange={onChange}
          cols="30"
          rows="5"
          className="bg-gray-100 p-2 px-4 placeholder-gray w-4/12 mb-6 form-control"
        />
      )}
    </>
  );
};

export default FieldTypeTextarea;

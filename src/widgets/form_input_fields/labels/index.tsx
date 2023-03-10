import React from "react";

const FieldLabel = ({
    htmlfor,
    labelText,
    required,
    star
}: any) => {
  return (
    <label htmlFor={htmlfor}>
      {labelText} <sup className={required}>{star}</sup>
    </label>
  );
};

export default FieldLabel;

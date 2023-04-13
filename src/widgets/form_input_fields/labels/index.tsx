import React from "react";

const FieldLabel = ({
    htmlfor,
    labelText,
    required,
    className,
    star
}: any) => {
  return (
    <label htmlFor={htmlfor} className={className}>
      {labelText} <sup className={required}>{star}</sup>
    </label>
  );
};

export default FieldLabel;

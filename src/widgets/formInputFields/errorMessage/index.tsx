import React from "react";

const FieldErrorMessage = ({ errors, touched, msgText }: any) => {
  const error = errors !== undefined && errors.charAt(0).toUpperCase() + errors.slice(1);
  return (
    <React.Fragment>
      {errors && touched ? (
        <p className="error-message">
          <i className="fa fa-circle-exclamation"></i> {error}
        </p>
      ) : null}
    </React.Fragment>
  );
};

export default FieldErrorMessage;

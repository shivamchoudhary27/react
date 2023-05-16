import React from "react";

const FieldErrorMessage = ({ errors, touched, msgText }: any) => {
  return (
    <>
      {errors && touched ? (
        <p className="error-message">
          <i className="fa fa-circle-exclamation"></i> {msgText}
        </p>
      ) : null}
    </>
  );
};

export default FieldErrorMessage;

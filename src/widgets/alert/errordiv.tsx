import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

function Errordiv({ cstate, msg, className, alertColor = "alert-primary" }: any) {
  const [show, setShow] = useState(cstate);
  return (
    <>
      <div className="table-wrapper mt-3">
        {show === true && (
          <Alert
            className={`${className} alert ${alertColor}`}
            role="alert"
            onClose={() => setShow(false)}
          >
            {msg}
          </Alert>
        )}
      </div>
    </>
  );
}
export default Errordiv;

import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

function Errordiv({ cstate, msg, className='', variant = "primary" }: any) {
  const [show, setShow] = useState(cstate);
  return (
    <>
      {show === true && (
        <Alert
          className={`${className}`}
          role="alert"
          variant={`${variant}`}
          onClose={() => setShow(false)}
        >
          {msg}
        </Alert>
      )}
    </>
  );
}
export default Errordiv;

import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

function Errordiv(props: { cstate: boolean; msg: string; className: string }) {
  const [show, setShow] = useState(props.cstate);
  console.log(props.cstate);
  return (
    <>
      <div>
        {show === true && (
          <Alert
            className={`${props.className} alert alert-primary`}
            role="alert"
            onClose={() => setShow(false)}
          >
            <h4>{props.msg}</h4>
          </Alert>
        )}
      </div>
    </>
  );
}
export default Errordiv;

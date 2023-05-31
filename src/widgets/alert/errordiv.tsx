import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

function Errordiv(props: { cstate: boolean; msg: string; className: string }) {
  const [show, setShow] = useState(props.cstate);
  console.log(props.cstate);
  return (
    <>
      <div className="table-wrapper mt-3">
        {show === true && (
          <Alert
            className={`${props.className} alert alert-primary`}
            role="alert"
            onClose={() => setShow(false)}
          >
            {props.msg}
          </Alert>
        )}
      </div>
    </>
  );
}
export default Errordiv;

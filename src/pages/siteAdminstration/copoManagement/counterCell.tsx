import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";

type Props = {
  rowValue: any;
  disableStatus?: boolean;
  name: string;
  // handleChange: any
  values?:any
};

const initialValues = {};

const CounterCell = ({
  name,
  rowValue,
  disableStatus = false,
  // handleChange
  values
}: Props) => {
  return (
    <React.Fragment>
      {/* <Form> */}
        <ButtonGroup aria-label="Basic" size="sm" className="minusplus-btngroup">
          <Button variant="primary" disabled={disableStatus !== false} onClick={() => console.log("helo")}>
            <i className="fa-solid fa-minus"></i>
          </Button>
          {/* <input
            type="text"
            name={name}
            // value={rowValue}
            // onChange={(e) => handleChange(e.target.value)}
            placeholder="0%"
            disabled={disableStatus !== false}
          /> */}
          {/* <Field
            type="text"
            name={name}
            placeholder="0%"
            disabled={disableStatus !== false}
            as="input" // Use 'as' prop to specify the input element
          /> */}
          <Button variant="primary" disabled={disableStatus !== false}>
            <i className="fa-solid fa-plus"></i>
          </Button>
        </ButtonGroup>
      {/* </Form> */}
    </React.Fragment>
  );
};

export default CounterCell;

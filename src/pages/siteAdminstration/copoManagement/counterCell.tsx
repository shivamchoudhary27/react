import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";

type Props = {
  rowValue: any;
  disableStatus?: boolean
  counterHandler?: any
  handleIncrement?: any
  handleDecrement?: any
};

const CounterCell = ({ rowValue, disableStatus = false, counterHandler,handleIncrement, handleDecrement }: Props) => {
  return (
    <React.Fragment>
      <form>
        <ButtonGroup aria-label="Basic" size="sm" className="minusplus-btngroup">
          <Button variant="primary" disabled={disableStatus !== false} onClick={(e) => handleDecrement()}>
            <i className="fa-solid fa-minus"></i>
          </Button>
          <input
            type="text"
            value={rowValue}
            // onChange={(e) => counterHandler(e.target.value)}
            placeholder="0%"
            disabled={disableStatus !== false}
          />
          <Button variant="primary" disabled={disableStatus !== false} onClick={(e) => handleIncrement()}>
            <i className="fa-solid fa-plus"></i>
          </Button>
        </ButtonGroup>
      </form>
    </React.Fragment>
  );
};

export default CounterCell;

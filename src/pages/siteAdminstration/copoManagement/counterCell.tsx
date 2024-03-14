import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";

type Props = {
  rowValue: any;
};

const CounterCell = ({ rowValue }: Props) => {
  return (
    <React.Fragment>
      <form>
        <ButtonGroup aria-label="Basic" size="sm" className="minusplus-btngroup">
          <Button variant="primary">
            <i className="fa-solid fa-minus"></i>
          </Button>
          <input
            type="text"
            value={rowValue}
            onChange={(e) => {
                rowValue = e.target.value;
            }}
            placeholder="0%"
          />
          <Button variant="primary">
            <i className="fa-solid fa-plus"></i>
          </Button>
        </ButtonGroup>
      </form>
    </React.Fragment>
  );
};

export default CounterCell;

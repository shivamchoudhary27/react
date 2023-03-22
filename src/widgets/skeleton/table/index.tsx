import React from "react";
import Skeleton from "react-loading-skeleton";
import { Row, Col, Container } from "react-bootstrap";
import "./style.scss";

const Table_Skeleton = ({ numberOfRows, numberOfColumns }: any) => {
  const Rows = numberOfRows;
  const Columns = numberOfColumns;
  const arr = [];

  for (let i = 0; i < Columns; i++) {
    arr.push(i);
  }

  const x = (
    <Row>
      {arr.map((el, i) => (
        <Col md={3} key={i}>
          <Skeleton height={35} className="my-2" />
        </Col>
      ))}
    </Row>
  );

  const renderedRows = [...Array(Rows)].map((e, i) => <Container key={i}>{x}</Container>);

  return (
    <>
      <div>{renderedRows}</div>
    </>
  );
};

export default Table_Skeleton;

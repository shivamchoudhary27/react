import React from "react";
import { Pagination } from "react-bootstrap";

const Course_Pagination = () => {
  return (
    <>
      <Pagination className="my-3">
        {/* <Pagination.First /> */}
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Item active>{4}</Pagination.Item>
        <Pagination.Item>{5}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Next />
        {/* <Pagination.Last /> */}
      </Pagination>
    </>
  );
};

export default Course_Pagination;

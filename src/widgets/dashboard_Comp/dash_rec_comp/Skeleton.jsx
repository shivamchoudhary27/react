import React from "react";
import Skeleton from "react-loading-skeleton";
import { Container, Row } from "react-bootstrap";
import "./style.scss";

const SkeletonMimic = () => {
  return (
    <>
      <div>
        <Container>
          <Row>
            <CustomSkeletonCards />
            <CustomSkeletonCards />
            <CustomSkeletonCards />
            <CustomSkeletonCards />
          </Row>
        </Container>
      </div>
    </>
  );
};

const CustomSkeletonCards = () => {
  return (
    <div className="col-sm-3">
      <Skeleton height={150} />
      <div className="course-details">
        <h5 className="digital-market-course">
          <Skeleton height={30} />
        </h5>
        <p className="digital-market-course-details">
          <Skeleton height={60} />
        </p>
        <p className="">
          <Skeleton />
        </p>
      </div>
    </div>
  );
};

export default SkeletonMimic;

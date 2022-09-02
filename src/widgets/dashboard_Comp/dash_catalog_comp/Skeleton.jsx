import React from "react";
import Skeleton from "react-loading-skeleton";
import { Container, Row, Card } from "react-bootstrap";

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
    <div className="col-sm-3 gy-2">
      <Card className="p-3">
        <div className="text-center mb-2">
          <Skeleton height={80} width={80} circle={true} />
        </div>
        <div>
          <Skeleton height={30} />
        </div>
        <div>
          <Skeleton height={50} />
        </div>
      </Card>
    </div>
  );
};

export default SkeletonMimic;

import React from "react";
import Skeleton from "react-loading-skeleton";
import { Container, Row, Card } from "react-bootstrap";
import "./style.scss";

const SkeletonMimic = () => {
  return (
    <>
      <div className="ai-course">
        <div className="ai-border">
          <Container>
            <Row>
              <CustomSkeletonCards/>
              <CustomSkeletonCards/>
              <CustomSkeletonCards/>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

const CustomSkeletonCards = () => {
  return (
    <>
      <div className="col-sm-4">
        <Card className="p-3">
          <Row className="mb-4">
            <div className="col-sm-9">
              <Skeleton count={2} height={30} />
            </div>
            <div className="col-sm-3">
              <Skeleton height={60} width={60} circle={true} />
            </div>
          </Row>
          <div>
            <Skeleton height={30} />
          </div>
          <div>
            <Skeleton height={50} />
          </div>
        </Card>
      </div>
    </>
  );
}

export default SkeletonMimic;

import React from "react";
import Skeleton from "react-loading-skeleton";
import { Row } from "react-bootstrap";
const SkeletonMimic = () => {
  return (
    <>
      <SkeletonCard />
      <SkeletonCard />
    </>
  );
};
const SkeletonCard = () => {
  return (
    <>
      <div
        className="py-2 mb-3"
        style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
      >
        <Row>
          <div className="col-sm-3">
            <Skeleton width={200} height={150} />
          </div>
          <div className="col-sm-9">
            <Row>
              <div className="col-sm-9">
                <Skeleton height={30} />
                <Skeleton height={72} className="my-2" />
                <Skeleton height={25} width={150} />
              </div>
              <div className="col-sm-3 d-flex justify-content-center align-items-center">
                <Skeleton width={100} height={50} />
              </div>
            </Row>
          </div>
        </Row>
      </div>
    </>
  );
};
export default SkeletonMimic;

import React from "react";
import Skeleton from "react-loading-skeleton";

const FacultyWorkLoadSkeleton = () => (
  <React.Fragment>
    <div>
      <div className="mb-3">
        <Skeleton width={300} height={30} />
        <Skeleton width={150} height={15} />
        <Skeleton width={800} height={40} />
      </div>
      <div>
        <div style={{ display: "flex" }}>
          <Skeleton width={25} height={25} className="me-2" />
          <Skeleton width={200} height={25} />
        </div>
        <div className="my-2" style={{ display: "flex" }}>
          <Skeleton width={25} height={25} className="me-2" />
          <Skeleton width={200} height={25} />
        </div>
        <div style={{ display: "flex" }}>
          <Skeleton width={25} height={25} className="me-2" />
          <Skeleton width={200} height={25} />
        </div>
        <div style={{ textAlign: "center" }} className="mt-3">
          <Skeleton width={80} height={40} />
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default FacultyWorkLoadSkeleton;

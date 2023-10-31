import React from "react";
import Skeleton from "react-loading-skeleton";

type Props = {};

const ListSkeleton = (props: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <Skeleton count={1} height={30} width={250} />
        <Skeleton count={1} height={20} width={200} />
        <Skeleton count={1} height={20} width={100} />
      </div>
      <div>
        <Skeleton count={1} height={35} width={100} />
      </div>
    </div>
  );
};

export default ListSkeleton;

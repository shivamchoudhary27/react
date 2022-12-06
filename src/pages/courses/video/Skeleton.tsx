import React from "react";
import Skeleton from "react-loading-skeleton";
import { Container, Card } from "react-bootstrap";
const SkeletonMimic = () => {
  return (
    <>
      <div>
        <Container>
          <Card className="p-2 mb-2">
            <Skeleton height={500} />
          </Card>
        </Container>
      </div>
    </>
  );
};
const Col3 = () => {
  return (
    <>
      <Card className="p-2">
        <Skeleton height={50} count={5} />
      </Card>
    </>
  );
};
export { SkeletonMimic, Col3 };

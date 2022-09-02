import React from 'react';
// import {Cards} from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

const SkeletonMimic = () => {
  return (
    <>
    <div className="main-container pt-4 course-view-slider" id="courseviewslider">
        <div className="contents">
            <Skeleton/>
        </div>
      </div>
    </>
  )
}

export default SkeletonMimic;
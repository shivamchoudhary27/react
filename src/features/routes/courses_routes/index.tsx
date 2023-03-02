import React from "react";
import { Route } from "react-router-dom";
import ActivityPage from "../../../pages/courses/activity";
import Video from "../../../pages/courses/video";
import Attempt from "../../../pages/courses/quiz/attempt";
import Catalogue from "../../../pages/catalogue";
import Cart from "../../../pages/cartlist/Cart";
import Report from "../../../pages/courses/video/report";
import Startattempt from "../../../pages/courses/quiz";
import Review from "../../../pages/courses/quiz/review";

const CoursesRoutes = () => {
  return [
    <Route path="/mod/activity/:name/:instance" key="activity" element={<ActivityPage />} />,
    <Route path="/mod/video/:id/:courseid" key="video" element={<Video />} />,
    <Route
      path="/mod/attempt/quiz/:instance/:attemptid/:courseid"
      key ="attempt" element={<Attempt />}
    />,
    <Route path="/catalogue" key="catalogue" element={<Catalogue />} />,
    <Route path="/cart" key="cart" element={<Cart />} />,
    <Route path="/mod/video/report" key="report" element={<Report />} />,
    <Route path="/mod/quiz/:courseid/:instance" key="quiz" element={<Startattempt />} />,
    <Route
      path="/mod/quiz/review/:attemptid/:quizid/:courseid"
      key="review" element={<Review />}
    />,
  ];
};

export default CoursesRoutes;

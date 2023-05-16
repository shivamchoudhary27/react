import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import CatalogCard from "./CatalogCard";
import "./style.scss";
import { getData } from "../../../adapters";
import { Link } from "react-router-dom";
import SkeletonMimic from "./Skeleton";
import {DashCatalogType} from "../../../type/index";

function DashCatalog() {
  const [categories, setCategories] = useState<[DashCatalogType]>();
  const [loadSkeleton, setLoadSkeleton] = useState(true);
  useEffect(() => {
    const query = {
      wsfunction: "core_course_get_categories"
    };
    getData(query)
      .then(res => {
        if (res.status === 200 && res.data) {
          setCategories(res.data);
          setLoadSkeleton(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <div
      className="Catalog-course catalogue-course-slider"
      id="cataloguecourseslider"
    >
      <div className="text-center mb-5">
        <h1 className="catalog-course-heading">Course Catalogue</h1>
      </div>
      <div className="Course-inner">
        {loadSkeleton === true ? (
          <SkeletonMimic />
        ) : (
          <Row>
            {categories !== undefined &&
              categories.map(
                item =>
                  item.parent === 0 && (
                    <CatalogCard
                      key={item.id}
                      catName={item.name}
                      courseCount={item.coursecount}
                    />
                  )
              )}
          </Row>
        )}
      </div>
      {loadSkeleton === true ? null : (
        <div className="text-center mt-3">
          <Link to="/catalogue">
            <input
              type="button"
              className="more-course-btn"
              value="Load More"
            />
          </Link>
        </div>
      )}
    </div>
  );
}
export default DashCatalog;

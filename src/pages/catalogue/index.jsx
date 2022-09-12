import React, { useEffect, useState } from "react";
import Header from "../header";
import Sidebar from "../sidebar";
import "./style.scss";
import Accordion from "react-bootstrap/Accordion";
import Coursecataloguecard from "./coursecataloguecard";
import { getData } from "../../adapters";
import Pagination from "./Pagination";
import SkeletonMimic from "./Skeleton";

const Catalogue = () => {
  const [categories, setCategories] = useState();
  const [loadSkeleton, sertLoadSkeleton] = useState(true);
  const [showPerPage, setShowPerPage] = useState(2);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  useEffect(() => {
    const query = {
      wsfunction: "core_course_get_categories",
      // addsubcategories: 0
    };
    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data) {
          setCategories(res.data);
          sertLoadSkeleton(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Sidebar />
      <Header />
      <div className="main-container">
        <div className="contents">
          <div className="catalogue-heading-content">
            <div className="catalogue-banner-image"></div>
            <div className="catalogur-banner-text-content">
              <p className="catalogue-banner-name">Course Search</p>
              <div className="seacrh-input-icon">
                <input
                  className="search-course-input"
                  type="text"
                  placeholder="Search courses"
                />
                <i className="fa fa-search search-icon"></i>
              </div>
            </div>
          </div>
          <div className="pt-4">
            <div className="pb-3">
              <ul className="filter-items">
                <li>
                  <p className="filter-text">
                    <i className="fa fa-filter filter-icon"></i> Filter
                  </p>
                </li>
                <li>
                  <p className="filter-text">
                    {" "}
                    <span className="sort-by-filter">
                      Sort By:
                    </span> Recommended{" "}
                    <i className="fa fa-angle-down angle-down-icon"></i>
                  </p>
                </li>
              </ul>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-sm-3">
                  <div>
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Topic</Accordion.Header>
                        <Accordion.Body>
                          <p className="photoshop-item">
                            <input type="checkbox" />
                            <label className="photoshop-checkbox">
                              {" "}
                              Photoshop (15)
                            </label>
                          </p>
                          <p>
                            <input type="checkbox" />
                            <label className="photoshop-checkbox">
                              {" "}
                              Graphic Design (20)
                            </label>
                          </p>
                          <p>
                            <input type="checkbox" />
                            <label className="photoshop-checkbox">
                              {" "}
                              Image Editing (33)
                            </label>
                          </p>
                          <p>
                            <input type="checkbox" />
                            <label className="photoshop-checkbox">
                              {" "}
                              After Effects (25)
                            </label>
                          </p>
                          <p className="catalogue-show-more-btn">Show More</p>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>Level</Accordion.Header>
                        <Accordion.Body>
                          <p>
                            <input type="checkbox" />
                            <label className="photoshop-checkbox">
                              {" "}
                              All Level (805)
                            </label>
                          </p>
                          <p>
                            <input type="checkbox" />
                            <label className="photoshop-checkbox">
                              {" "}
                              Beginner (205)
                            </label>
                          </p>
                          <p>
                            <input type="checkbox" />
                            <label className="photoshop-checkbox">
                              {" "}
                              Intermediate (375)
                            </label>
                          </p>
                          <p>
                            <input type="checkbox" />
                            <label className="photoshop-checkbox">
                              {" "}
                              Expert (225)
                            </label>
                          </p>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div>
                <div className="col-sm-9">
                  {loadSkeleton === true ? (
                    <SkeletonMimic />
                  ) : (
                    categories != undefined &&
                    categories
                      .slice(pagination.start, pagination.end)
                      .map((item) => {
                        return (
                          <div key={item.id}>
                            <Coursecataloguecard
                              categoryName={item.name}
                              categoryId={item.id}
                              categoryTime={item.timemodified}
                              categoryDescription={item.description}
                            />
                          </div>
                        );
                      })
                  )}
                  {loadSkeleton === true ? null : (
                    <Pagination
                      showPerPage={showPerPage}
                      onPaginationChange={onPaginationChange}
                      totalData={categories != undefined && categories.length}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalogue;

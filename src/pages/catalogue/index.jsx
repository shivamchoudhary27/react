import React, { useEffect, useState, useRef } from "react";
import Header from "../header";
import Sidebar from "../sidebar";
import "./style.scss";
import Accordion from "react-bootstrap/Accordion";
import Coursecataloguecard from "./coursecataloguecard";
import { getData } from "../../adapters";
import Pagination from "./Pagination";
import SkeletonMimic from "./Skeleton";
import { useNavigate } from "react-router-dom";

const Catalogue = () => {
  const showPerPage = 2;
  const categoryList = [];
  const navigate = useNavigate();
  const inputElem = useRef("");
  const [categories, setCategories] = useState();
  const [courseList, setCourseList] = useState();
  const [isChecked, setIsChecked] = useState([]);
  const [searchData, setSearchData] = useState();
  const [filterdCourses, setFilteredCourses] = useState([]);
  const [filterVal, setFilterVal] = useState("");
  const [loadSkeleton, setLoadSkeleton] = useState(true);
  const [filterToggle, setFilterToggle] = useState(true);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const localCart = localStorage.getItem('courseCartId');
  const storedCart =  localCart !== null ? JSON.parse(localCart) : null;
  const [counter, setCounter] = useState(storedCart !== null ? storedCart.length : 0);
  const [courseIdStore, setCourseIdStore] = useState(storedCart !== null ? storedCart : []);

  // Pagination === >>
  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  // Hit get-courses API === >>
  useEffect(() => {
    const query = {
      wsfunction: "core_course_get_courses",
      ids: [],
    };
    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data) {
          res.data.shift();
          setCourseList(res.data);
          setSearchData(res.data);
          setLoadSkeleton(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Hit get-categories API === >>
  useEffect(() => {
    const query = {
      wsfunction: "core_course_get_categories",
    };
    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data) {
          for (let i = 0; i < res.data.length; i++) {
            categoryList.push(res.data[i]);
            setCategories(categoryList);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Select Category from Accordian === >>
  useEffect(() => {
    if (isChecked.length === 0) {
      setFilteredCourses(courseList);
    } else {
      setFilteredCourses(
        courseList.filter((element) => {
          return isChecked.includes(element.categoryid);
        })
      );
    }
  }, [courseList, isChecked]);

  // remove item from cart === >>
  useEffect(() => {
    remove();
  }, [courseIdStore]);

  // Search courses from search box === >>
  const handleFilter = () => {
    if (inputElem.current.value !== "") {
      const filterResult = searchData.filter((item) => {
        return item.fullname
          .toLowerCase()
          .includes(inputElem.current.value.toLowerCase());
      });
      setCourseList(filterResult);
      console.log(courseList);
    } else {
      setCourseList(searchData);
    }
    setFilterVal(inputElem.current.value);
  };


  const handleChecked = (e) => {
    const getCategoryId = parseInt(e.target.getAttribute("dataid"));
    if (e.target.checked === true) {
      setIsChecked((current) => [...current, getCategoryId]);
    } else {
      setIsChecked((current) =>
        current.filter((element) => {
          return element !== getCategoryId;
        })
      );
    }
  };

  // Handle cart counter === >>
  const cartCounter = (e) => {
    if (e === true) {
      setCounter((counter) => counter + 1);
    } else setCounter((counter) => counter - 1);
  };

  const counterCourseId = (element) => {
    if (element.status === true) {
      setCourseIdStore((current) => [...current, element.data]);
      console.log(JSON.stringify(courseIdStore));
      localStorage.setItem("courseCartId", JSON.stringify(courseIdStore));
    } else {
      let courseIdSet = courseIdStore;
      const x = courseIdSet.indexOf(element.data);
      let removeItem = courseIdSet.splice(x, 1);
      courseIdSet = courseIdSet.filter(item => item !== removeItem);
      setCourseIdStore(courseIdSet);
    }
  };

  // remove items from cart === >>
  function remove() {
    localStorage.setItem("courseCartId", JSON.stringify(courseIdStore));
   }

  // Navigate to cart page === >>
  const handleCartNavigate = () => {
    navigate("/cart");
  }

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
                  ref={inputElem}
                  className="search-course-input"
                  type="text"
                  placeholder="Search courses"
                  onChange={(e) => {
                    handleFilter(e);
                  }}
                  value={filterVal}
                />
                <i className="fa fa-search search-icon"></i>
              </div>
            </div>
          </div>
          <div className="pt-4">
            <div className="ai-feature-dropdown">
              <div>
                <ul className="filter-items">
                  <li>
                    <p
                      className="filter-text"
                      onClick={() => setFilterToggle(!filterToggle)}
                    >
                      <i className="fa fa-filter filter-icon"></i> Filter
                    </p>
                  </li>
                  <li>
                    <p className="filter-text">
                      {" "}
                      <span className="sort-by-filter">Sort By:</span>{" "}
                      Recommended{" "}
                      <i className="fa fa-angle-down angle-down-icon"></i>
                    </p>
                  </li>
                </ul>
              </div>
              <div onClick={handleCartNavigate}>
                <span className="cart-txt">Cart Added</span>
                <span className="fa-solid fa-cart-plus">
                  <sup>{counter}</sup>
                </span>
              </div>
            </div>
            <div className="container">
              <div className="row ">
                {filterToggle && (
                  <div className="col-sm-3 ai-left-column">
                    <div className="ai-accordian-sticky">
                      <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>Categories List</Accordion.Header>
                          <Accordion.Body>
                            {categories !== undefined && categories.length === 0
                              ? "No record found"
                              : categories !== undefined &&
                                categories.map(
                                  (el, i) =>
                                    el.coursecount !== 0 && (
                                      <p className="photoshop-item" key={i}>
                                        <input
                                          type="checkbox"
                                          onChange={(e) => {
                                            handleChecked(e);
                                          }}
                                          dataid={el.id}
                                        />
                                        <label className="photoshop-checkbox">
                                          {" "}
                                          {el.name}
                                        </label>{" "}
                                        <span>{`(${el.coursecount})`}</span>
                                      </p>
                                    )
                                )}
                            <p className="catalogue-show-more-btn">Show More</p>
                          </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="1" className="course-level">
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
                )}
                {filterdCourses !== undefined && filterdCourses.length === 0 ? (
                  "No Records Found!"
                ) : (
                  <div
                    className={`col-sm-9 ai-right-column ${
                      filterToggle === false && "col-sm-12"
                    }`}
                  >
                    {loadSkeleton === true ? (
                      <SkeletonMimic />
                    ) : (
                      filterdCourses !== undefined &&
                      filterdCourses
                        .slice(pagination.start, pagination.end)
                        .map((item) => {
                          return (
                            <div key={item.id} courseid={item.courseid}>
                              <Coursecataloguecard
                                courseName={item.fullname}
                                courseId={item.id}
                                courseTime={item.timemodified}
                                courseSummary={item.summary}
                                cartCounter={cartCounter}
                                counterCourseId={counterCourseId}
                                courseIdStore={courseIdStore}
                              />
                            </div>
                          );
                        })
                    )}
                    {loadSkeleton === true ? null : (
                      <Pagination
                        showPerPage={showPerPage}
                        onPaginationChange={onPaginationChange}
                        totalData={courseList != undefined && courseList.length}
                        courseIdStore={courseIdStore}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalogue;

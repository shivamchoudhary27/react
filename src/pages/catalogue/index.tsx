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
import { CategoriesType, FilterdCoursesType, CounterValueType, CataloguePaginationType } from "../../type/index";

const Catalogue: React.FunctionComponent = () => {
  const showPerPage = 2;
  let categoryList:any = [];
  const inputElem = useRef<HTMLInputElement | any>();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [courseList, setCourseList] = useState<any>();
  const [isChecked, setIsChecked] = useState<any>([]);
  const [searchData, setSearchData] = useState<any>();
  const [filterdCourses, setFilteredCourses] = useState<any[]>();
  const [filterVal, setFilterVal] = useState<string>('');
  const [loadSkeleton, setLoadSkeleton] = useState(true);
  const [filterToggle, setFilterToggle] = useState(true);
  const [pagination, setPagination] = useState<CataloguePaginationType>({
    start: 0,
    end: showPerPage,
  });
  const localCart = localStorage.getItem("courseCartId");
  const storedCart = localCart !== null ? JSON.parse(localCart) : null;
  const [counter, setCounter] = useState<any>(
    storedCart !== null ? storedCart.length : 0
  );
  const [courseIdStore, setCourseIdStore] = useState<any>(
    storedCart !== null ? storedCart : []
  );
  // const [categoriesListing, setCategoriesListing] = useState(5);
  // const [showToggle, setShowToggle] = useState(true);

  // Pagination === >>
  const onPaginationChange = (start:number, end: number) => {
    setPagination({ start: start, end: end });
  };
  // Hit get-courses API === >>
  useEffect(() => {
    const query = {
      wsfunction: "core_course_get_courses",
      ids: [],
    };
    getData(query)
      .then((res: any) => {
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
        courseList.filter((element: { categoryid: any; }) => {
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
      const filterResult = searchData.filter((item: { fullname: string; }) => {
        return item.fullname
          .toLowerCase()
          .includes(inputElem.current.value.toLowerCase());
      });
      setCourseList(filterResult);
    } else {
      setCourseList(searchData);
    }
    setFilterVal(inputElem.current.value);
  };
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>, elementId: any) => {
    const getCategoryId = parseInt(elementId);
    if (e.target.checked === true) {
      setIsChecked((current: any) => [...current, getCategoryId]);
    } else {
      setIsChecked((current: any[]) =>
        current.filter((element) => {
          return element !== getCategoryId;
        })
      );
    }
  };
  // Handle cart counter === >>
  const cartCounter = (e: boolean) => {
    if (e === true) {
      setCounter((counter: number) => counter + 1);
    } else setCounter((counter: number) => counter - 1);
  };
  const counterCourseId = (element: CounterValueType["counterCourseId"]) => {
    if (element.status === true) {
      setCourseIdStore((current: any) => [...current, element.data]);
      localStorage.setItem("courseCartId", JSON.stringify(courseIdStore));
    } else {
      let courseIdSet = courseIdStore;
      const courseSelectId = courseIdSet.indexOf(element.data);
      let removeItem = courseIdSet.splice(courseSelectId, 1);
      courseIdSet = courseIdSet.filter((item: any) => item !== removeItem);
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
  };

  // const handleHideShow = () => {
  //   setShowToggle(!showToggle);
  //   setCategoriesListing(categories.length)
  // }

  return (
    <>
      <Sidebar />
      <Header pageHeading="Catalogue" welcomeIcon={false} />
      <div className="main-container">
        <div className="contents">
          <div className="catalogue-heading-content">
            <div className="catalogue-banner-image" />
            <div className="catalogur-banner-text-content">
              <p className="catalogue-banner-name">Course Search</p>
              <div className="seacrh-input-icon">
                <input
                  ref={inputElem}
                  className="search-course-input"
                  type="text"
                  placeholder="Search courses"
                  onChange={() => {
                    handleFilter();
                  }}
                  value={filterVal}
                />
                <i className="fa fa-search search-icon" />
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
                      <i className="fa fa-filter filter-icon" /> Filter
                    </p>
                  </li>
                  <li>
                    <p className="filter-text">
                      {" "}
                      <span className="sort-by-filter">Sort By:</span>{" "}
                      Recommended{" "}
                      <i className="fa fa-angle-down angle-down-icon" />
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
                            {categories.map(
                                  (el: CategoriesType, i: number) =>
                                    el.coursecount !== 0 && (
                                      <p className="photoshop-item" key={i}>
                                        <input
                                          type="checkbox"
                                          onChange={(e) => {  
                                            handleChecked(e, el.id);
                                          }}
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
                            <div key={item.id}>
                              <Coursecataloguecard
                                courseName={item.fullname}
                                courseId={item.id}
                                courseTime={item.timemodified}
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
                        filterdLength={filterdCourses !== undefined ? filterdCourses.length : 0}
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
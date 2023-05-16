import React, { useEffect, useState, useRef } from "react";
import Header from "../header";
import Sidebar from "../sidebar";
import "./style.scss";
import Coursecataloguecard from "./coursecataloguecard";
import { getData } from "../../adapters";
// import Pagination from "./Pagination";
import SkeletonMimic from "./Skeleton";
import TrendingCourses from "./trendingCourses";
import { useNavigate } from "react-router-dom";
import SortByComp from "./sortByComp";
import AccordianDropdown from "./accordianDropdown";
import AddedCardBtn from "./addedCardBtn";
import { Button } from "react-bootstrap";
import {
  FilterdCoursesType,
  CounterValueType,
  CataloguePaginationType,
} from "../../type/index";
import BuildPagination from "../../widgets/pagination";
import { pagination } from "../../utils/pagination";

const Catalogue: React.FunctionComponent = () => {
  const showPerPage = 2;
  let categoryList: any = [];
  const inputElem = useRef<HTMLInputElement | any>();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [courseList, setCourseList] = useState<any>();
  const [isChecked, setIsChecked] = useState<any>([]);
  const [searchData, setSearchData] = useState<any>();
  const [filterdCourses, setFilteredCourses] = useState<any[]>();
  const [filterVal, setFilterVal] = useState<string>("");
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
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: 2,
  });
  // const [categoriesListing, setCategoriesListing] = useState(5);
  // const [showToggle, setShowToggle] = useState(true);

  // Pagination === >>
  const onPaginationChange = (start: number, end: number) => {
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
        courseList.filter((element: { categoryid: any }) => {
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
      const filterResult = searchData.filter((item: { fullname: string }) => {
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
  const handleChecked = (
    e: React.ChangeEvent<HTMLInputElement>,
    elementId: any
  ) => {
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

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  return (
    <>
      <Header pageHeading="Catalogue" welcomeIcon={false} />
      <div className="main-content-container">
        <Sidebar />
        <div
          className="content-area content-area-slider"
          id="contentareaslider"
        >
          <div className="catalogue-heading-content">
            <div className="catalogue-banner-image" />
            <div className="catalogur-banner-text-content">
              <h5 className="catalogue-banner-name">Course Search</h5>
              <div className="seacrh-input-icon">
                <input
                  ref={inputElem}
                  className="search-course-input"
                  type="text"
                  placeholder="What do you want to study?"
                  onChange={() => {
                    handleFilter();
                  }}
                  value={filterVal}
                />
                <i className="fa fa-search search-icon" />
              </div>
              <Button
                className="btn btn-primary"
                onClick={() => navigate("/programoverview")}
              >
                Program Overview
              </Button>
            </div>
          </div>
          <TrendingCourses />
          <div className="pt-4">
            <div className="ai-feature-dropdown">
              <SortByComp
                filterToggle={filterToggle}
                setFilterToggle={setFilterToggle}
              />
              <AddedCardBtn
                handleCartNavigate={handleCartNavigate}
                counter={counter}
              />
            </div>
            <div className="container-fluid">
              <div className="row ">
                <AccordianDropdown
                  filterToggle={filterToggle}
                  categories={categories}
                  handleChecked={handleChecked}
                />
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
                        .slice(filterUpdate.pageNumber, filterUpdate.pageSize)
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
                    <BuildPagination
                      totalpages="5"
                      activepage="1"
                      getrequestedpage={newPageRequest}
                    />
                    {/* {loadSkeleton === true ? null : (
                      <Pagination
                        showPerPage={showPerPage}
                        onPaginationChange={onPaginationChange}
                        filterdLength={
                          filterdCourses !== undefined
                            ? filterdCourses.length
                            : 0
                        }
                      />
                    )} */}
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

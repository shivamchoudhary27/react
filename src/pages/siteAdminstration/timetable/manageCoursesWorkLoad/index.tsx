import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import CourseWorkLoadModal from "./form";
import CourseWorkLoadTable from "./table";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../headerTabs";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PageTitle from "../../../../widgets/pageTitle";
import { setHasChildProp, resetManageCourseObj } from "./local";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";
import { getData as getCategoryData } from "../../../../adapters/microservices/index";
import {
  getLatestWeightForCategory,
  updateCategoryLevels,
  getChildren,
} from "./utils";

const ManageCoursesWorkLoad = () => {
  const { id, name } = useParams();
  const [categoryData, setCategoryData] = useState([]);
  const [sortedCategories, setSortedCategories] = useState<any>([]);
  const [parentWeight, setParentWeight] = useState<number>(0);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [deleteRefresh, setDeleteRefresh] = useState<boolean>(false);
  const [modalShow, setModalShow] = useState(false);
  const [formParent, setFormParent] = useState<number>(0);
  const [formWeight, setFormWeight] = useState<number>(0);
  const [apiStatus, setApiStatus] = useState("");
  const [editCategory, setEditCategory] = useState<any>({
    id: 0,
    name: "",
    weight: 0,
    parent: 0,
  });
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    // pageSize: pagination.PERPAGE,
    pageSize: 300,
  });
  const [addCourseModal, setAddCourseModal] = useState(false);
  const [courseObj, setCourseObj] = useState({
    id: "",
    name: "",
    labWorkload: 0,
    theoryWorkload: 0,
  });
  const currentInstitute = useSelector(
    (state) => state.globalFilters.currentInstitute
  );
  const coursePermission = useSelector(
    (state: any) => state.userAuthorities.permissions.course
  );

  const getCategoriesData = () => {
    const endPoint = `/${id}/category`;
    setApiStatus("started");
    getCategoryData(endPoint, filterUpdate)
      .then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setCategoryData(res.data.items);
        }
        setApiStatus("finished");
      })
      .catch((err: any) => {
        console.log(err);
        setApiStatus("finished");
      });
  };
  // Get category Data from API === >>
  useEffect(() => {
    if (deleteRefresh === true) {
      getCategoriesData();
    }
  }, [deleteRefresh]);

  // Get category Data from API === >>
  useEffect(() => {
    getCategoriesData();
  }, [id, refreshData]);

  useEffect(() => {
    if (categoryData.length > 0) {
      const convertedResult = categoryData
        .filter((item) => item.parent === 0)
        .sort((a, b) => a.weight - b.weight)
        .reduce(
          (acc, item) => [...acc, item, ...getChildren(item, categoryData)],
          []
        );

      convertedResult.forEach((item) => {
        if (item.parent === 0) {
          item.level = 1;
          updateCategoryLevels(convertedResult, item.id, 2);
        }
      });
      const hasChildPropAdded = setHasChildProp(convertedResult);
      const courseObjAdded = resetManageCourseObj(hasChildPropAdded);
      setSortedCategories(courseObjAdded);
    }
  }, [categoryData]);

  // handle to count weight for acategory === >>
  useEffect(() => {
    if (categoryData.length > 0) {
      let largestWeight = getLatestWeightForCategory(0, categoryData);
      setParentWeight(largestWeight);
    }
  }, [categoryData]);

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  const toggleCourseModal = (status: boolean) => {
    setAddCourseModal(status);
  };

  // handle to Edit Course modal === >>>
  const editHandlerById = ({ id, name, labWorkload, theoryWorkload }: any) => {
    setCourseObj({
      id: id,
      name: name,
      labWorkload: labWorkload,
      theoryWorkload: theoryWorkload,
    });
  };

  // handle to re-rendering of category table === >>
  const refreshToggle = (status: boolean) => {
    setRefreshData(!refreshData);
    setSortedCategories([]);
  };

  const updateDeleteRefresh = (status: boolean) => {
    setDeleteRefresh(status);
    setSortedCategories([]);
  };

  const setFormParentValue = (value: number) => {
    setFormParent(value);
  };

  const setFormWeightValue = (value: number) => {
    setFormWeight(value);
  };

  const setEditCategoryValues = (catInfo: any) => {
    setEditCategory(catInfo);
    setFormWeight(catInfo.weight);
    setFormParent(catInfo.parent);
  };

  const cleanFormValues = () => {
    setEditCategory({ id: 0, name: "", weight: 0, parent: 0 });
  };

  return (
    <>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Timetable Management", path: "/timetable" },
          { name: "Manage Courses Work Load", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle
            pageTitle={`Manage Courses Work Load: ${name}`}
            gobacklink="/timetable"
          />
          {coursePermission.canView && (
            <CourseWorkLoadTable
              programId={id}
              apiStatus={apiStatus}
              modalShow={modalShow}
              categoryData={sortedCategories}
              coursePermission={coursePermission}
              toggleModalShow={toggleModalShow}
              refreshcategories={refreshToggle}
              cleanFormValues={cleanFormValues}
              editHandlerById={editHandlerById}
              toggleCourseModal={toggleCourseModal}
              setFormParentValue={setFormParentValue}
              setFormWeightValue={setFormWeightValue}
              updatedeleterefresh={updateDeleteRefresh}
              setEditCategoryValues={setEditCategoryValues}
            />
          )}
        </Container>
        <CourseWorkLoadModal
          programId={id}
          courseobj={courseObj}
          show={addCourseModal}
          currentInstitute={currentInstitute}
          updateAddRefresh={refreshToggle}
          refreshcategories={refreshToggle}
          toggleCourseModal={toggleCourseModal}
          onHide={() => toggleCourseModal(false)}
        />
      </div>
      <Footer />
    </>
  );
};

export default ManageCoursesWorkLoad;
import React, { useState, useEffect } from "react";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
// import Sidebar from "../../sidebar";
import { Container, Button } from "react-bootstrap";
import CourseTable from "./courseTable";
import { useNavigate, useParams } from "react-router-dom";
import { getData as getCategoryData } from "../../../adapters/microservices/index";
import {
  getLatestWeightForCategory,
  updateCategoryLevels,
  getChildren,
} from "./utils";
import { setHasChildProp, resetManageCourseObj } from "./local";
import PageTitle from "../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import CourseModal from "./courseModal";

const CourseManagment = () => {
  const navigate = useNavigate();
  const { id, name } = useParams();
  const [categoryData, setCategoryData] = useState([]);
  const [sortedCategories, setSortedCategories] = useState<any>([]);
  const [parentWeight, setParentWeight] = useState<number>(0);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [deleteRefresh, setDeleteRefresh] = useState<boolean>(false);
  const [modalShow, setModalShow] = useState(false);
  const [formParent, setFormParent] = useState<number>(0);
  const [formWeight, setFormWeight] = useState<number>(0);
  const [editCategory, setEditCategory] = useState<any>({
    id: 0,
    name: "",
    weight: 0,
    parent: 0,
  });
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    // pageSize: pagination.PERPAGE,
    pageSize: 100,
  });
  const [addCourseModal, setAddCourseModal] = useState(false);
  const [courseObj, setCourseObj] = useState({
    name: "",
    courseCode: "",
    caytegory: "",
    description: "",
    publish: "",
  });

  const getCategoriesData = () => {
    const endPoint = `/${id}/category`;
    getCategoryData(endPoint, filterUpdate)
      .then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setCategoryData(res.data.items);
        }
      })
      .catch((err: any) => {
        console.log(err);
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

  // handle to open Add Course modal === >>>
  const openAddCourseModal = () => {
    setAddCourseModal(true);
    setCourseObj({
      id: 0,
      name: "",
      courseCode: "",
      caytegory: "",
      description: "",
      publish: "",
    });
    // setRefreshData(false);
  };

  // handle to Edit Course modal === >>>
  const editHandlerById = ({
    id,
    name,
    courseCode,
    category,
    description,
  }: any) => {
    console.log(id)
    setCourseObj({
      id: id,
      name: name,
      courseCode: courseCode,
      category: category,
      description: description,
      // publish: ""
    });
  };

  const resetModalForm = () => {
    setModalShow(false);
    setFormWeight(0);
    setFormParent(0);
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
          { name: "Manage Program", path: "/manageprogram" },
          { name: "Manage Courses", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3">
        <Container fluid>
          <PageTitle pageTitle="Manage Courses" gobacklink="/manageprogram" />
          {sortedCategories.length !== 0 && (
            <CourseTable
              categoryData={sortedCategories}
              modalShow={modalShow}
              toggleModalShow={toggleModalShow}
              programId={id}
              setFormParentValue={setFormParentValue}
              setFormWeightValue={setFormWeightValue}
              updatedeleterefresh={updateDeleteRefresh}
              setEditCategoryValues={setEditCategoryValues}
              refreshcategories={refreshToggle}
              cleanFormValues={cleanFormValues}
              toggleCourseModal={toggleCourseModal}
              editHandlerById={editHandlerById}
              openAddCourseModal={openAddCourseModal}
              
            />
          )}
        </Container>
        <CourseModal
          show={addCourseModal}
          onHide={() => toggleCourseModal(false)}
          courseobj={courseObj}
          programId={id}
          toggleCourseModal={toggleCourseModal}
          updateAddRefresh={refreshToggle}
        />
      </div>
      <Footer />
    </>
  );
};

export default CourseManagment;

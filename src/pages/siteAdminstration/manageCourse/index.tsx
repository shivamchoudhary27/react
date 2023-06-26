import React, { useState, useEffect } from "react";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import { Container } from "react-bootstrap";
import CourseTable from "./table";
import { useParams } from "react-router-dom";
import { getData as getCategoryData, deleteData as deleteCategoryData} from "../../../adapters/microservices/index";
import {
  getLatestWeightForCategory,
  updateCategoryLevels,
  getChildren,
} from "./utils";
import { setHasChildProp, resetManageCourseObj } from "./local";
import PageTitle from "../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import CourseModal from "./form";
import TableSkeleton from "../../../widgets/skeleton/table";
import Errordiv from "../../../widgets/alert/errordiv";
import DeleteAlert from "../../../widgets/alert/deleteAlert";

const CourseManagment = () => {
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
    courseCode: "",
    category: "",
    description: "",
    published: false,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [onDeleteAction, setOnDeleteAction] = useState("");
  const [deleteId, setDeleteId] = useState(0);

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
  const editHandlerById = ({
    id,
    name,
    courseCode,
    category,
    description,
    published
  }: any) => {
    setCourseObj({
      id: id,
      name: name,
      courseCode: courseCode,
      category: category,
      description: description,
      published: published
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

  /// category Table Elements Delete handler === >>
  useEffect(()=>{
    if (onDeleteAction === "Yes") {
      updateDeleteRefresh(false);
      const endPoint = `${id}/course/${deleteId}`;
      deleteCategoryData(endPoint)
      .then((res: any) => {
        if (res.status === 200) {
          console.log(res.data);
          updateDeleteRefresh(true);
          setShowAlert(true);
            setAlertMsg({
              message: "Deleted successfully!",
              alertBoxColor: "success",
            });
        } 
      }).catch((result : any) => {
        if (result.response.status === 500) {
          setShowAlert(true);
            setAlertMsg({
              message: "Unable to delete, this course",
              alertBoxColor: "danger",
            });
        }            
      });
    }
    setOnDeleteAction("");
  }, [onDeleteAction])

  const getDeleteCourseID = (courseID: any) => {
    updateDeleteRefresh(false);
    setDeleteId(courseID)
    setShowDeleteModal(true);
  }

  // getting onDelete Modal Action === >>>
  const deleteActionResponse = (action: string) => {
    console.log(action);
    setOnDeleteAction(action);
    setShowDeleteModal(false);
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
            getDeleteCourseID={getDeleteCourseID}           
          />
          {sortedCategories.length > 0 ? (
            <></>
            ) : apiStatus === "started" && categoryData.length === 0 ? (
              <TableSkeleton numberOfRows={5} numberOfColumns={4} />
            ) : apiStatus === "finished" && categoryData.length === 0 && (
              <Errordiv msg="No record found!" cstate className="mt-3" />
            )}
            <DeleteAlert
              show={showDeleteModal}
              onHide={() => setShowDeleteModal(false)}
              deleteActionResponse={deleteActionResponse}
              modalHeading="Course"
            />
        </Container>
        <CourseModal
          show={addCourseModal}
          onHide={() => toggleCourseModal(false)}
          courseobj={courseObj}
          programId={id}
          toggleCourseModal={toggleCourseModal}
          updateAddRefresh={refreshToggle}
          refreshcategories={refreshToggle}
        />
      </div>
      <Footer />
    </>
  );
};

export default CourseManagment;

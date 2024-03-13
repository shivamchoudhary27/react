import View from "./view";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {postData, getData as getCategoryData} from "../../../adapters/microservices/index";
import {
  getLatestWeightForCategory,
  updateCategoryLevels,
  getChildren,
} from "./utils";
import { setHasChildProp, resetManageCourseObj } from "./local";
import { pagination } from "../../../utils/pagination";

const CourseManagment = () => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };

  const { id, name } = useParams();
  const [categoryData, setCategoryData] = useState(dummyData);
  const [sortedCategories, setSortedCategories] = useState<any>([]);
  const [parentWeight, setParentWeight] = useState<number>(0);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [deleteRefresh, setDeleteRefresh] = useState<boolean>(false);
  const [modalShow, setModalShow] = useState(false);
  const [formParent, setFormParent] = useState<number>(0);
  const [formWeight, setFormWeight] = useState<number>(0);
  const [apiStatus, setApiStatus] = useState("");
  const [filesIds, setFilesIds] = useState([]);
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
    files: [],
    startDate: "",
    endDate: "",
    courseType: null,
    enrollmentCapacity: "",
  });
  const coursePermission = useSelector(
    (state: any) => state.userAuthorities.permissions.course
  );

  const getCategoriesData = () => {
    const endPoint = `/${id}/category`;
    setApiStatus("started");
    getCategoryData(endPoint, filterUpdate)
      .then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setCategoryData(res.data);
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
  }, [id, refreshData, filterUpdate]);

  useEffect(() => {
    if (categoryData.items.length > 0) {
      const convertedResult = categoryData.items
        .filter((item) => item.parent === 0)
        .sort((a, b) => a.weight - b.weight)
        .reduce(
          (acc, item) => [
            ...acc,
            item,
            ...getChildren(item, categoryData.items),
          ],
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

  // ============================================================
  //                      Set Files Ids
  // ============================================================
  // useEffect(() => {
  //   categoryData.items.map((category: any) => {
  //     if (category.courses.length > 0) {
  //       category.courses.map((course: any) => {
  //         if (course.files.length > 0) {
  //           course.files.forEach((fileId: any) => {
  //             setFilesIds((prevFilesIds) => [
  //               ...prevFilesIds,
  //               { id: fileId.id },
  //             ]);
  //           });
  //         }
  //       });
  //     }
  //   });
  // }, [categoryData]);

  // useEffect(() => {
  //   if (filesIds.length > 0) {
  //     postData(`/files`, filesIds)
  //       .then((result: any) => {
  //         if (result.data !== "" && result.status === 200) {
  //           console.log(result.data);
  //         }
  //       })
  //       .catch((err: any) => {
  //         console.log(err);
  //       });
  //   }
  // }, [filesIds]);
  // ============================================================
  //                            End
  // ============================================================


  
  // handle to count weight for acategory === >>
  useEffect(() => {
    if (categoryData.items.length > 0) {
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
    published,
    files,
    startDate,
    endDate,
    courseType,
    enrollmentCapacity,
  }: any) => {
    setCourseObj({
      id,
      name,
      courseCode,
      category,
      description,
      published,
      files,
      startDate,
      endDate,
      courseType,
      enrollmentCapacity,
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

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  return (
    <View
      programId={id}
      courseObj={courseObj}
      modalShow={modalShow}
      apiStatus={apiStatus}
      filterUpdate={filterUpdate}
      refreshToggle={refreshToggle}
      addCourseModal={addCourseModal}
      newPageRequest={newPageRequest}
      toggleModalShow={toggleModalShow}
      editHandlerById={editHandlerById}
      cleanFormValues={cleanFormValues}
      sortedCategories={sortedCategories}
      coursePermission={coursePermission}
      toggleCourseModal={toggleCourseModal}
      setFormParentValue={setFormParentValue}
      setFormWeightValue={setFormWeightValue}
      updateDeleteRefresh={updateDeleteRefresh}
      totalPages={categoryData.pager.totalPages}
      setEditCategoryValues={setEditCategoryValues}
    />
  );
};

export default CourseManagment;

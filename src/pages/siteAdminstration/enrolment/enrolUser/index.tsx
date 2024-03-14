import View from "./view";
import {
  getLatestWeightForCategory,
  updateCategoryLevels,
  getChildren,
} from "./utils";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setHasChildProp, resetManageCourseObj } from "./local";
import { getData as getCategoryData } from "../../../../adapters/microservices/index";

const EnrolUsers = () => {
  const navigate = useNavigate();
  const { id, name } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [formLebel, setFormLebel] = useState<number>(0);
  const [formParent, setFormParent] = useState<number>(0);
  const [formWeight, setFormWeight] = useState<number>(0);
  const [parentWeight, setParentWeight] = useState<number>(0);
  const [refreshData, setRefreshData] = useState<boolean>(true);
  const [sortedCategories, setSortedCategories] = useState<any>([]);
  const [deleteRefresh, setDeleteRefresh] = useState<boolean>(false);

  const [editCategory, setEditCategory] = useState<any>({
    id: 0,
    name: "",
    level: 0,
    weight: 0,
    parent: 0,
  });
  const [maxMinorCoursesObj, setMaxMinorCoursesObj] = useState<any>({
    id: "",
    name: "",
    level: "",
    weight: "",
    parent: "",
    maxMinorCoursesAllowed: "",
    dateUserUnenrolmentAllowed: ""
  });
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    // pageSize: pagination.PERPAGE,
    pageSize: 100,
  });

  const currentUserRole = useSelector(
    (state) => state.globalFilters.currentUserRole
  );

  const [apiStatus, setApiStatus] = useState("");

  const getCategoriesData = () => {
    setApiStatus("started");
    const endPoint = `/${id}/category`;
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
  }

  // Get category Data from API === >>
  useEffect(() => {
    if (deleteRefresh === true) {
      getCategoriesData();
    }
  }, [deleteRefresh]);

  // Get category Data from API === >>
  useEffect(() => {
    getCategoriesData();
  }, [id, refreshData, currentUserRole]);

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
    setFormLebel(catInfo.level);
    setFormWeight(catInfo.weight);
    setFormParent(catInfo.parent);
  };

  const cleanFormValues = () => {
    setEditCategory({ id: 0, name: "", level: 0, weight: 0, parent: 0 });
  };

  // category Table Elements Update handler === >>
  const editHandlerById = ({
    id,
    name,
    level,
    weight,
    parent,
    maxMinorCoursesAllowed,
    dateUserUnenrolmentAllowed
  }: any) => {
    toggleModalShow(true);
    setMaxMinorCoursesObj({
      id,
      name,
      level,
      weight,
      parent,
      maxMinorCoursesAllowed,
      dateUserUnenrolmentAllowed
    });
  };
  return (
    <View
      name={name}
      programid={id}
      modalShow={modalShow}
      apiStatus={apiStatus}
      refreshToggle={refreshToggle}
      currentUserRole={currentUserRole}
      toggleModalShow={toggleModalShow}
      cleanFormValues={cleanFormValues}
      editHandlerById={editHandlerById}
      sortedCategories={sortedCategories}
      setFormParentValue={setFormParentValue}
      setFormWeightValue={setFormWeightValue}
      maxMinorCoursesObj={maxMinorCoursesObj}
      updateDeleteRefresh={updateDeleteRefresh}
      setEditCategoryValues={setEditCategoryValues}
    />
  );
};

export default EnrolUsers;

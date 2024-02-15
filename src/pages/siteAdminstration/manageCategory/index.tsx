import View from "./view";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getData as getCategoryData } from "../../../adapters/microservices/index";
import {
  getLatestWeightForCategory,
  updateCategoryLevels,
  getChildren,
  setHasChildProp,
} from "./utils";
import { pagination } from "../../../utils/pagination";
import Alert from "react-bootstrap/Alert";
import { alertMsgProps } from "../manageCourse/type";

const ManageCategory = () => {

  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };

  const { id, name } = useParams();
  const [apiStatus, setApiStatus] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [categoryData, setCategoryData] = useState(dummyData);
  const [formParent, setFormParent] = useState<number>(0);
  const [formWeight, setFormWeight] = useState<number>(0);
  const [parentWeight, setParentWeight] = useState<number>(0);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [sortedCategories, setSortedCategories] = useState<any>([]);
  const [deleteRefresh, setDeleteRefresh] = useState<boolean>(false);
  const [editCategory, setEditCategory] = useState<any>({
    id: 0,
    name: "",
    weight: 0,
    parent: 0,
  });
  // const [filterUpdate, setFilterUpdate] = useState<any>({
  //   pageNumber: 0,
  //   pageSize: 200,
  // });

  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
    // pageSize: 300,
  });
  const categoryPermission = useSelector(
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
        .filter((item: any) => item.parent === 0)
        .sort((a: any, b: any) => a.weight - b.weight)
        .reduce(
          (acc: any, item: any) => [
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
      const canBeDeletedPropAdded = hasChildPropAdded.map((packet: any) => {
        if (packet.haschild === true) {
          const childPackets = hasChildPropAdded.filter(
            (child: any) => child.parent === packet.id
          );
          packet.canBeDeleted = !childPackets.some(
            (child: any) => child.courses.length > 0
          );
        } else {
          packet.canBeDeleted = packet.courses.length > 0 ? false : true;
        }
        return packet;
      });
      setSortedCategories(canBeDeletedPropAdded);
    }
  }, [categoryData]);

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

  const AlertMessage = ({ variant, strong, msg }: alertMsgProps) => {
    return (
      <Alert className="mt-3" variant={variant}>
        <strong>{strong}</strong>: {msg}
      </Alert>
    );
  };

const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  return (
    <View
      id={id}
      modalShow={modalShow}
      apiStatus={apiStatus}
      formWeight={formWeight}
      formParent={formParent}
      parentWeight={parentWeight}
      editCategory={editCategory}
      refreshToggle={refreshToggle}
      newPageRequest={newPageRequest}
      resetModalForm={resetModalForm}
      cleanFormValues={cleanFormValues}
      toggleModalShow={toggleModalShow}
      sortedCategories={sortedCategories}
      filterUpdate={filterUpdate.pageNumber}
      categoryPermission={categoryPermission}
      setFormParentValue={setFormParentValue}
      setFormWeightValue={setFormWeightValue}
      updateDeleteRefresh={updateDeleteRefresh}
      totalPages={categoryData.pager.totalPages}
      setEditCategoryValues={setEditCategoryValues}
    />
  );
};
export default ManageCategory;

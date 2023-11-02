import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import HeaderTabs from "../../headerTabs";
import Footer from "../../newFooter";
import Header from "../../newHeader";
import { Container } from "react-bootstrap";
import CategoryTable from "./table";
import Addcategory from "./addCategory";
import { useParams } from "react-router-dom";
import { getData as getCategoryData } from "../../../adapters/microservices/index";
import {
  getLatestWeightForCategory,
  updateCategoryLevels,
  getChildren,
  setHasChildProp
} from "./utils";
import CategoryModal from "./form";
import Alert from "react-bootstrap/Alert";
import { alertMsgProps } from "../manageCourse/type";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import PageTitle from "../../../widgets/pageTitle";

const ManageCategory = () => {
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
    pageSize: 200,
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
        .filter((item: any) => item.parent === 0)
        .sort((a: any, b: any) => a.weight - b.weight)
        .reduce(
          (acc: any, item: any) => [...acc, item, ...getChildren(item, categoryData)],
          []
        );

      convertedResult.forEach((item) => {
        if (item.parent === 0) {
          item.level = 1;
          updateCategoryLevels(convertedResult, item.id, 2);
        }
      });
      const hasChildPropAdded = setHasChildProp(convertedResult);
      const canBeDeletedPropAdded = hasChildPropAdded.map((packet : any) => {
        if (packet.haschild === true) {
          const childPackets = hasChildPropAdded.filter((child : any) => child.parent === packet.id);
          packet.canBeDeleted = !childPackets.some((child : any) => child.courses.length > 0);
        } else {
          packet.canBeDeleted = (packet.courses.length > 0) ? false : true;
        }
        return packet;
      });
      setSortedCategories(canBeDeletedPropAdded);
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

  return (
    <>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Manage Program", path: "/manageprogram" },
          { name: "Manage Category", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle
            pageTitle="Manage Categories"
            gobacklink="/manageprogram"
          />
          {categoryPermission.canView &&
            <CategoryTable
              categoryData={sortedCategories}
              modalShow={modalShow}
              toggleModalShow={toggleModalShow}
              id={id}
              setFormParentValue={setFormParentValue}
              setFormWeightValue={setFormWeightValue}
              updatedeleterefresh={updateDeleteRefresh}
              setEditCategoryValues={setEditCategoryValues}
              refreshcategories={refreshToggle}
              cleanFormValues={cleanFormValues}
              apiStatus={apiStatus}
              categoryPermission={categoryPermission}
            />
          }

          <Addcategory
            latestparentweight={parentWeight}
            toggleModalShow={toggleModalShow}
            modalShow={modalShow}
            setFormParentValue={setFormParentValue}
            setFormWeightValue={setFormWeightValue}
            onClick={cleanFormValues}
            setEditCategoryValues={setEditCategoryValues}
          />
          
          <CategoryModal
            show={modalShow}
            toggleModalShow={toggleModalShow}
            onHide={() => resetModalForm()}
            weight={formWeight}
            parent={formParent}
            refreshcategories={refreshToggle}
            editCategory={editCategory}
          />
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default ManageCategory;

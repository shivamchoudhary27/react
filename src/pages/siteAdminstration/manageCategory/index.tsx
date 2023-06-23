import React, { useState, useEffect } from "react";
import HeaderTabs from "../../headerTabs";
import Footer from "../../newFooter";
import Header from "../../newHeader";
import { Container } from "react-bootstrap";
import CategoryTable from "./table";
import Addcategory from "./addCategory";
import { useParams } from "react-router-dom";
import { getData as getCategoryData, deleteData as deleteCategoryData } from "../../../adapters/microservices/index";
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
import Errordiv from "../../../widgets/alert/errordiv";
import TableSkeleton from "../../../widgets/skeleton/table";
import DeleteAlert from "../../../widgets/alert/deleteAlert";
import TimerAlertBox from "../../../widgets/alert/timerAlert";

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
      console.log("set to refresh");
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

  /// category Table Elements Delete handler === >>
  useEffect(()=>{
    if (onDeleteAction === "Yes") {
      updateDeleteRefresh(false);
      const endPoint = `${id}/category/${deleteId}`;
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
        console.log(result)
        if (result.response.status === 500) {
          setShowAlert(true);
            setAlertMsg({
              message: "Unable to delete, this category might have come courses",
              alertBoxColor: "danger",
            });
        }            
      });
    }
    setOnDeleteAction("");
  }, [onDeleteAction])

  const getDeleteCategoryID = (delID: any) => {
    updateDeleteRefresh(false);
    setDeleteId(delID)
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
          { name: "Manage Category", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3">
        <Container fluid>
          <PageTitle
            pageTitle="Manage categories"
            gobacklink="/manageprogram"
          />
          {sortedCategories.length > 0 ? (
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
              getDeleteCategoryID={getDeleteCategoryID}
            />
          ) : apiStatus === "started" && sortedCategories.length === 0 ? (
            <TableSkeleton numberOfRows={5} numberOfColumns={4} />
          ) : apiStatus === "finished" && sortedCategories.length === 0 && (
            <Errordiv msg="No record found!" cstate className="mt-3" />
          )}
          <DeleteAlert
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            deleteActionResponse={deleteActionResponse}
            modalHeading="Category"
          />
           <TimerAlertBox
        alertMsg={alertMsg.message}
        className="mt-3"
        variant={alertMsg.alertBoxColor}
        setShowAlert={setShowAlert}
        showAlert={showAlert}
      />

          <Addcategory
            latestparentweight={parentWeight}
            toggleModalShow={toggleModalShow}
            modalShow={modalShow}
            setFormParentValue={setFormParentValue}
            setFormWeightValue={setFormWeightValue}
            onClick={cleanFormValues}
          />
          {/* {modalShow === true
            && */}
          <CategoryModal
            show={modalShow}
            toggleModalShow={toggleModalShow}
            onHide={() => resetModalForm()}
            weight={formWeight}
            parent={formParent}
            refreshcategories={refreshToggle}
            editCategory={editCategory}
          />
          {/* } */}
        </Container>
        {/* {sortedCategories.length !== 0 ? (
            <AlertMessage
              variant="info"
              strong="Instruction"
              msg="Not able to drag on parent position!"
            />
          ) : (
            <AlertMessage
              variant="secondary"
              strong="No records found!"
              msg=""
            />
          )} */}
      </div>
      <Footer />
    </>
  );
};

export default ManageCategory;

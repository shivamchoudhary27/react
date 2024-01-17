import React, { useState, useEffect } from "react";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import HeaderTabs from "../../../headerTabs";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";
import { Container, Button } from "react-bootstrap";
import EnrolUserTable from "./courseTable";
import { useNavigate, useParams } from "react-router-dom";
import { getData as getCategoryData } from "../../../../adapters/microservices/index";
import {
  getLatestWeightForCategory,
  updateCategoryLevels,
  getChildren,
} from "./utils";
import { setHasChildProp, resetManageCourseObj } from "./local";
import PageTitle from "../../../../widgets/pageTitle";
import TableSkeleton from "../../../../widgets/skeleton/table";
import Errordiv from "../../../../widgets/alert/errordiv";
import ModalForm from "./form";

const EnrolUsers = () => {
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
  const [formLebel, setFormLebel] = useState<number>(0);
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
    parent: ""
  })
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    // pageSize: pagination.PERPAGE,
    pageSize: 100,
  });
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
    setEditCategory({ id: 0, name: "", level:0, weight: 0, parent: 0 });
  };

   // category Table Elements Update handler === >>
   const editHandlerById = ({
    id,
    name,
    level,
    weight,
    parent,
  }: any) => {
    toggleModalShow(true);
    setMaxMinorCoursesObj({
      id,
      name,
      level,
      weight,
      parent,
    });
  };

  return (
    <>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Programs Enrollment", path: "/programenrollment" },
          { name: name, path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle
            pageTitle={`Program: <span>${name}</span>`}
            gobacklink={`/manageprogramenrollment/${id}/${name}`}
          />
          {sortedCategories.length !== 0 ? (
            <EnrolUserTable
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
              editHandlerById={editHandlerById}
              apiStatus={apiStatus}
              name={name}
            />
          ) : (
            (apiStatus === "started" && sortedCategories.length === 0 && (
              <TableSkeleton numberOfRows={5} numberOfColumns={4} />
            )) ||
            (apiStatus === "finished" && sortedCategories.length === 0 && (
              <Errordiv msg="No record found!" cstate className="mt-3" />
            ))
          )}
        </Container>
        <ModalForm
        onHide={() => toggleModalShow(false)}
        modalShow={modalShow}
        programId={id}
        toggleModalShow={toggleModalShow}
        refreshcategories={refreshToggle}
        maxMinorCoursesObj={maxMinorCoursesObj}
      />
      </div>
      
      <Footer />
    </>
  );
};

export default EnrolUsers;

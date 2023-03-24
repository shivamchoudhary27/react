import React, { useState, useEffect } from "react";
import Header from "../../header";
import Sidebar from "../../sidebar";
import { Container, Button } from "react-bootstrap";
import CategoryTable from "./categoryTable";
import Addcategory from "./addcategory";
import { useNavigate, useParams } from "react-router-dom";
import { getData as getCategoryData } from "../../../adapters/microservices/index";
import { getLatestWeightForCategory, updateCategoryLevels, getChildren } from "./utils";
import CategoryModal from "./categoryModal";

const ManageCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categoryData, setCategoryData] = useState([]);
  const [sortedCategories, setSortedCategories] = useState<any>([]);
  const [parentWeight, setParentWeight] = useState<number>(0);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [deleteRefresh, setDeleteRefresh] = useState<boolean>(false);
  const [modalShow, setModalShow] = useState(false);
  const [formParent, setFormParent] = useState<number>(0);
  const [formWeight, setFormWeight] = useState<number>(0);
  const [editCategory, setEditCategory] = useState<any>({id: 0, name: "", weight: 0, parent: 0});

  const getCategoriesData = () => {
    const endPoint = `/${id}/category`;
    getCategoryData(endPoint, {})
      .then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setCategoryData(res.data);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  // Get category Data from API === >>
  useEffect(() => {
    if (deleteRefresh === true) {
      console.log('set to refresh');
      getCategoriesData();
      
    } 
  }, [deleteRefresh]);
  
  // Get category Data from API === >>
  useEffect(() => {
    getCategoriesData();
  }, [id, refreshData]);

  useEffect(() => {
    if (categoryData.length > 0) {
      const convertedResult = categoryData.filter(item => item.parent === 0)
                            .sort((a,b) => a.weight - b.weight)
                            .reduce((acc, item) => [...acc, item, ...getChildren(item, categoryData)], []);
      
      convertedResult.forEach(item => {
        if (item.parent === 0) {
          item.level = 1;
          updateCategoryLevels(convertedResult, item.id, 2);
        }
      });
      console.log('new update', convertedResult);
      setSortedCategories(convertedResult)
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
  }

  // handle to re-rendering of category table === >>
  const refreshToggle = (status: boolean) => {
    setRefreshData(!refreshData);
    setSortedCategories([]);
  };

  const updateDeleteRefresh = (status: boolean) => {
    setDeleteRefresh(status);
    setSortedCategories([]);
  }

  const setFormParentValue = (value : number) => {
    setFormParent(value);
  }

  const setFormWeightValue = (value : number) => {
    setFormWeight(value);
  }

  const setEditCategoryValues = (catInfo : any) => {
    setEditCategory(catInfo);
    setFormWeight(catInfo.weight)
    setFormParent(catInfo.parent);
  }

  return (
    <>
      <Header
        pageHeading="Manage Categories: Master of Computer Applications"
        welcomeIcon={false}
      />
      <div className="main-content-container">
        <Sidebar />
        <div
          className="content-area content-area-slider"
          id="contentareaslider"
        >
          <Container fluid className="administration-wrapper">
            <Button
              variant="outline-secondary"
              onClick={() => navigate("/manageprogram")}
            >
              Go back
            </Button>
            <hr />
            {sortedCategories.length !== 0 && (
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
              />
            )}
            <Addcategory
              latestparentweight={parentWeight}
              toggleModalShow={toggleModalShow}
              modalShow={modalShow}
              setFormParentValue={setFormParentValue}
              setFormWeightValue={setFormWeightValue}
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
        </div>
      </div>
    </>
  );
};

export default ManageCategory;
import React, { useState, useEffect } from "react";
import Header from "../../header";
import Sidebar from "../../sidebar";
import { Container, Button } from "react-bootstrap";
import CategoryTable from "./categoryTable";
import Addcategory from "./addcategory";
import { useNavigate, useParams } from "react-router-dom";
import { getData as getCategoryData } from "../../../adapters/microservices/index";
import { getLatestWeightForCategory } from "./utils";

const ManageCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categoryData, setCategoryData] = useState([]);
  const [parentWeight, setParentWeight] = useState<number>(0);
  const [refreshData, setRefreshData] = useState(true);
  const [modalShow, setModalShow] = useState(false);

  // Get category Data from API === >>
  useEffect(() => {
    if (refreshData === true) {
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
  }, [id, refreshData]);

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

  // handle to re-rendering of category table === >>
  const refreshToggle = (status: boolean) => {
    setRefreshData(status);
  };

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
            {categoryData.length !== 0 && (
              <CategoryTable
                categoryData={categoryData}
                modalShow={modalShow}
                toggleModalShow={toggleModalShow}
                id={id}
              />
            )}
            <Addcategory
              latestparentweight={parentWeight}
              refreshCategoryTable={refreshToggle}
              toggleModalShow={toggleModalShow}
              modalShow={modalShow}
            />
          </Container>
        </div>
      </div>
    </>
  );
};

export default ManageCategory;

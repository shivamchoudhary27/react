import React, {useState, useEffect} from "react";
import Header from "../../header";
import Sidebar from "../../sidebar";
import { Container, Button } from "react-bootstrap";
import CategoryTable from "./categoryTable";
import Addcategory from "./addcategory";
import { useNavigate, useParams } from "react-router-dom";
import {getData as getCategoryData} from '../../../adapters/microservices/index';

const ManageCategory = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [categoryData, setCategoryData] = useState([]);

  useEffect(()=>{
    const endPoint = `/${id}/category`;
    getCategoryData(endPoint, {}).then((res: any)=>{
      if(res.data !== "" && res.status === 200){
        setCategoryData(res.data)
      }
    })
  }, [id])
  
  return (
    <>
      <Header pageHeading="Manage Categories: Master of Computer Applications" welcomeIcon={false} />
      <div className='main-content-container'>
        <Sidebar />
        <div className="content-area content-area-slider" id="contentareaslider">
        <Container fluid className="administration-wrapper">
          <Button
            variant="outline-secondary"
            onClick={() => navigate("/manageprogram")}
          >
            Go back
          </Button>
          <hr />
          {categoryData.length !== 0  &&
            <CategoryTable categoryData={categoryData} />
          }
          <Addcategory />
        </Container>
        </div>        
      </div>      
    </>
  );
};

export default ManageCategory;

import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Header from "../../header";
import Sidebar from "../../sidebar";
import AddTags from "./addTags";
import TagsModal from "./tagsModal";
import TagsTable from "./tagsTable";
import { getData as getTagsData } from "../../../adapters/microservices";

const Tags = () => {
  const [modalShow, setModalShow] = useState(false);
  const [allTags, setAllTags] = useState<any>([]);

  useEffect(()=>{
    const endPoint = "/tags"
    getTagsData(endPoint, {}).then((res: any)=>{
        if(res.data !== "" && res.status === 200){
            console.log(res);
            setAllTags(res.data);
        } 
    }).catch((err: any)=>{
        console.log(err)
    })
  }, [])

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  return (
    <>
      <Header pageHeading="Tags" welcomeIcon={false} />
      <div className="main-content-container">
        <Sidebar />
        <div
          className="content-area content-area-slider"
          id="contentareaslider"
        >
          <Container fluid className="administration-wrapper">
            <AddTags toggleModalShow={toggleModalShow} />
            <TagsModal
              show={modalShow}
              onHide={() => toggleModalShow(false)}
              togglemodalshow={toggleModalShow}
            />
            <hr />
            <TagsTable allTags={allTags.items} toggleModalShow={toggleModalShow} />
          </Container>
        </div>
      </div>
    </>
  );
};

export default Tags;

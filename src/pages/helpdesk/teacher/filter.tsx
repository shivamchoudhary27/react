
import React, { useState } from "react";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type Props = {
  toggleModalShow: any;
  selectedTopic: any;
  updateTopicFilter: any;
  updateInputFilters: any;
};

const Filter = (props: Props) => {
  const navigate = useNavigate();
  const [selectedTopicValue, setSelectedTopicValue] = useState("");
  const [selectedPublishedValue, setSelectedPublishedValue] = useState("");

  const formik = useFormik({
    initialValues: "",
    onSubmit: (values: any) => {},
    onReset: () => {},
  });

  const getCurrentValue = (e: any) => {
    console.log(e.target.value, "----------value");
    props.updateTopicFilter(e.target.value,selectedPublishedValue);
    setSelectedTopicValue(e.target.value);
  };


  const getCurrentPublishedValue = (e: any) => {
    console.log(e.target.value, "----------published");
    props.updateTopicFilter(selectedTopicValue, e.target.value);
    setSelectedPublishedValue(e.target.value);
  };

  return (
    <React.Fragment>
      <div className="filter-wrapper mt-2">
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Row className="g-2">
            <Col>
              <label htmlFor="topicName">Select Topic</label>
              <select
                className="form-select"
                name="topicName"
                onChange={getCurrentValue}
                value={selectedTopicValue}
              >
                <option value="">All</option>
                {props.selectedTopic.map((option: any, index: number) => (
                  <option key={index} value={option.id}>
                    {option.topicName}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <label htmlFor="published">Status</label>
              <select
                className="form-select"
                name="published"
                onChange={getCurrentPublishedValue}
                value={selectedPublishedValue}
              >
                <option value="">All</option>
                <option value="open">Open</option> 
                <option value="close">Close</option>
               
              </select>
            </Col>
           
          </Row>
        </form>
        <div className="site-button-group">
          <div>
            <Button
              variant="primary"
              onClick={() => props.toggleModalShow(true)}>
              New Request
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate("/helpdeskmanagement")}>
              Helpdesk Management
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filter;


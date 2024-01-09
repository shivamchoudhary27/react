
import { useFormik } from "formik";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { dateConverterToDYM } from "../../../lib/timestampConverter";

type Props = {
  selectedTopic: any;
  updateTopicFilter: any;
  
};

const Filter = (props: Props) => {
  const navigate = useNavigate();
  const [selectedTopicValue, setSelectedTopicValue] = useState("");
  const [selectedPublishedValue, setSelectedPublishedValue] = useState("");
  const [selectStartDateValue, setSelectStartDateValue] = useState("");
  const [selectEndDateValue, setSelectEndDateValue] = useState("");
  
  const formik = useFormik({
    initialValues: {
      topicName: '',
      published: '',
      startDate: '',
      endDate: '',
    },
    onSubmit: (values: any) => {},
    onReset: () => {},
  });

  const getCurrentValue = (e: any) => {
    props.updateTopicFilter(e.target.value, selectedPublishedValue,selectStartDateValue,selectEndDateValue);
    setSelectedTopicValue(e.target.value);
  };

  const getCurrentPublishedValue = (e: any) => {
    props.updateTopicFilter(selectedTopicValue, e.target.value,selectStartDateValue,selectEndDateValue);
    setSelectedPublishedValue(e.target.value);
  };

  const handleDateChange = (e: any, type: string) => {
    const dateValue = e.target.value;
    const convertedDate = dateConverterToDYM(dateValue);
  
    if (type === 'startDate') {
      formik.setFieldValue('startDate', dateValue);
      setSelectStartDateValue(dateValue);
      props.updateTopicFilter(selectedTopicValue, selectedPublishedValue, convertedDate, selectEndDateValue);
    } else if (type === 'endDate') {
      formik.setFieldValue('endDate', dateValue);
      setSelectEndDateValue(dateValue);
      props.updateTopicFilter(selectedTopicValue, selectedPublishedValue, dateConverterToDYM(selectStartDateValue), convertedDate);
    }
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
            
            <Col>
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                className="form-control"
                name="startDate"
                value={selectStartDateValue}
                onChange={(e) => handleDateChange(e, 'startDate')}
              />
            </Col>
            <Col>
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                className="form-control"
                name="endDate"
                value={selectEndDateValue}
                onChange={(e) => handleDateChange(e, 'endDate')}
              />
            </Col>

          </Row>
        </form>
        <div className="site-button-group">
          <div>
            <Button variant="primary" onClick={() => navigate("/managetopic")}>
              Manage Topic
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filter;

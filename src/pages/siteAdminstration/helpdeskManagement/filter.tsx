import { useFormik } from "formik";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { dateConverterToDYM } from "../../../lib/timestampConverter";
import { isMobile } from 'react-device-detect';
import FilterButtonWrapper from "../../../widgets/filterButtonWrapper";


type Props = {
  selectedTopic: any;
  getAllProgram: any;
  updateTopicFilter: any;
};

const Filter = (props: Props) => {
  const navigate = useNavigate();
  const [selectProgram, setSelectProgram] = useState("");
  const [selectedTopicValue, setSelectedTopicValue] = useState("");
  const [selectedPublishedValue, setSelectedPublishedValue] = useState("");
  const [selectStartDateValue, setSelectStartDateValue] = useState("");
  const [selectEndDateValue, setSelectEndDateValue] = useState("");
  const [endDateError, setEndDateError] = useState("");

  const formik = useFormik({
    initialValues: {
      topicName: "",
      published: "",
      startDate: "",
      endDate: "",
    },
    onSubmit: (values: any) => {},
    onReset: () => {},
  });

  const getCurrentValue = (e: any) => {
    props.updateTopicFilter(
      e.target.value,
      selectedPublishedValue,
      selectStartDateValue,
      selectEndDateValue
    );
    setSelectedTopicValue(e.target.value);
  };

  const getCurrentPublishedValue = (e: any) => {
    props.updateTopicFilter(
      selectedTopicValue,
      e.target.value,
      selectEndDateValue,
      selectStartDateValue
    );
    setSelectedPublishedValue(e.target.value);
  };

  const handleDateChange = (e: any, type: string) => {
    const dateValue = e.target.value;
    const convertedDate = dateConverterToDYM(dateValue);

    // if (type === "startDate") {
    //   formik.setFieldValue("startDate", dateValue);
    //   setSelectStartDateValue(dateValue);
    //   props.updateTopicFilter(
    //     selectedTopicValue,
    //     selectedPublishedValue,
    //     convertedDate,
    //     dateConverterToDYM(selectEndDateValue)
    //   );
    // } else if (type === "endDate") {
    //   formik.setFieldValue("endDate", dateValue);
    //   setSelectEndDateValue(dateValue);
    //   props.updateTopicFilter(
    //     selectedTopicValue,
    //     selectedPublishedValue,
    //     dateConverterToDYM(selectStartDateValue),
    //     convertedDate
    //   );
    // }

    if (type === "startDate") {
      formik.setFieldValue("startDate", dateValue);
      setSelectStartDateValue(dateValue);
      props.updateTopicFilter(
        selectedTopicValue,
        selectedPublishedValue,
        convertedDate,
        // dateConverterToDYM(selectEndDateValue)
        selectEndDateValue==""?selectEndDateValue:dateConverterToDYM(selectEndDateValue),
      );
    } else if (type === "endDate") {

      formik.setFieldValue("endDate", dateValue);
      setSelectEndDateValue(dateValue);
      props.updateTopicFilter(
        selectedTopicValue,
        selectedPublishedValue,
        selectStartDateValue==""?selectStartDateValue:dateConverterToDYM(selectStartDateValue),
        convertedDate
      );
  };

    // Validate endDate
    const startDate = new Date(selectStartDateValue);
    const endDate = new Date(dateValue);

    if (startDate > endDate) {
      setEndDateError("Invalid date");
    } else {
      setEndDateError(""); // Reset error if valid
    }
  };

  const getCurrentProgram = (e: any) => {
    props.updateTopicFilter(
      selectedTopicValue,
      selectedPublishedValue,
      selectStartDateValue,
      selectEndDateValue,
      e.target.value
    );
    setSelectProgram(e.target.value);
  };

  return (
    <React.Fragment>
      <div className="filter-wrapper mt-2">
    <div className={`${isMobile ? 'w-100' : ''}`}>
      <FilterButtonWrapper>
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Row className={`g-2 ${isMobile ? 'd-flex flex-column mb-2' : ''}`}>
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
                onChange={(e) => handleDateChange(e, "startDate")}
              />
            </Col>
            <Col>
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                className="form-control"
                name="endDate"
                value={selectEndDateValue}
                onChange={(e) => handleDateChange(e, "endDate")}
              />
              {endDateError && (
                <div style={{ color: "red" }}>{endDateError}</div>
              )}
            </Col>

            <Col>
              <label htmlFor="name">Program</label>
              <select
                className="form-select"
                name="name"
                onChange={getCurrentProgram}
                value={selectProgram}
              >
                <option value="">Select Program</option>
                {props.getAllProgram.map((option: any, index: number) => (
                  <option key={index} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
        </form>
      </FilterButtonWrapper>
    </div>
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

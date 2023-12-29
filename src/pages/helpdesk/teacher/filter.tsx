import React, { useState } from "react";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { filterConfig } from "../../../utils/filterTimeout";
import ManageDropdown from "./manageDropDown";

const initialValues = {
  topicName: "",
};

const Filters = ({
  selectedTopic,
  updateTopicFilter,
  toggleModalShow,
  updateInputFilters,
}: any) => {
  const navigate = useNavigate();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectPublished, setSelectPublish] = useState("");

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: any) => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      updateTopicFilter(selectedValue, selectPublished);
    },
    onReset: () => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      formik.setValues({
        topicName: "",
      });
      // Clear selected published value
      setSelectedValue("");
      setSelectPublish("");
      updateTopicFilter("");
    },
  });

  // Event handler for filter input change with debounce
  const handleFilterChange = (event: any) => {
    formik.handleChange(event); // Update formik values

    if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any

    // Set a new timeout to trigger updatefilters after a delay
    const newTimeoutId = setTimeout(() => {
      updateInputFilters(event.target.value);
    }, filterConfig.timeoutNumber); // Adjust the delay (in milliseconds) as per your needs

    setTimeoutId(newTimeoutId); // Update the timeout ID in state
  };

  // Function to handle changes in the selected value
  const getCurrentPublishedValue = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setSelectPublish(value);
  };

  return (
    <React.Fragment>
      <div className="filter-wrapper mt-2">
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Row className="g-2">
            <Col>
              <ManageDropdown
                selectedTopic={selectedTopic}
                updateTopicFilter={updateTopicFilter}
                setSelectedValue={setSelectedValue}
                selectedValue={selectedValue}
              />
            </Col>
            <Col>
              <select
                className="form-select"
                name="published"
                onChange={(e) => getCurrentPublishedValue(e)}
                value={selectPublished}
              >
                <option value="0">All</option>
                <option value="Open">Open</option>
                <option value="Close">Close</option>
              </select>
            </Col>
          </Row>
        </form>
        <div className="site-button-group">
          <div>
            <Button variant="primary" onClick={() => toggleModalShow(true)}>
              New Request
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate("/helpdeskmanagement")}
            >
              Helpdesk Management
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filters;

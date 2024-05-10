import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Link, useParams } from "react-router-dom";
import {
  Alert,
  Table,
  Button,
  OverlayTrigger,
  Tooltip as BsTooltip,
} from "react-bootstrap";
import { postData } from "../../../../adapters/microservices";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import RouterLadyLoader from "../../../../globals/globalLazyLoader/routerLadyLoader";
import * as Yup from "yup";
import SelectCell from "../selectCell";
import deleteIcon from "../../../../assets/images/icons/delete-action.svg";
import AssessmentButtons from "./assessmentButtons";

const initialValues = {};

const AssessmentTable = ({ setActiveTab }: any) => {
  const [testColumns, setTestColumns] = useState(["Test-1", "Test-2"]); // Initial Test columns
  const [iaColumns, setIaColumns] = useState(["IA-1", "IA-2"]); // Initial IA columns
  const [labColumns, setLabColumns] = useState(["LAB-1 %"]); // Initial LAB columns
  const [reachMaxColumnMsg, setReachMaxColumnMsg] = useState({
    status: false,
    msg: "",
  });

  const quizOptions = [
    { value: "test1", label: "Quiz 1" },
    { value: "test2", label: "Quiz 2" },
    { value: "test3", label: "Quiz 3" },
    { value: "test4", label: "Quiz 4" },
    { value: "test5", label: "Quiz 5" },
    // Add more options as needed
  ];

  const iaOptions = [
    { value: "ia1", label: "Quiz 1" },
    { value: "ia2", label: "Quiz 2" },
    { value: "ia3", label: "Quiz 3" },
    { value: "ia4", label: "Quiz 4" },
    { value: "ia5", label: "Quiz 5" },
    // Add more options as needed
  ];

  const labOptions = [
    { value: "lab1", label: "Assignment 1" },
    { value: "lab2", label: "Assignment 2" },
    { value: "lab3", label: "Assignment 3" },
    { value: "lab4", label: "Assignment 4" },
    { value: "lab5", label: "Assignment 5" },
    // Add more options as needed
  ];

  const addTestColumns = () => {
    if (testColumns.length < 5) {
      const newTestColumns = [...testColumns];
      const newColumnIndex = newTestColumns.length + 1;
      newTestColumns.push(`Test-${newColumnIndex}`);
      setTestColumns(newTestColumns);
    } else {
      // Handle max limit reached
      setReachMaxColumnMsg({
        status: true,
        msg: "You have reached the maximum limit. You can't add more than 5 Test columns.",
      });
    }
  };

  const removeTestColumns = (indexToRemove: number) => {
    const newTestColumns = testColumns.filter(
      (_, index) => index !== indexToRemove
    );
    // Update column names to maintain sequential numbering
    const updatedTestColumns = newTestColumns.map(
      (column, index) => `Test-${index + 1}`
    );
    setTestColumns(updatedTestColumns);
    setReachMaxColumnMsg({ status: false, msg: "" });
  };

  const addIaColumns = () => {
    if (iaColumns.length < 5) {
      const newIaColumns = [...iaColumns];
      const newColumnIndex = newIaColumns.length + 1;
      newIaColumns.push(`IA-${newColumnIndex}`);
      setIaColumns(newIaColumns);
    } else {
      // Handle max limit reached
      setReachMaxColumnMsg({
        status: true,
        msg: "You have reached the maximum limit. You can't add more than 5 IA columns.",
      });
    }
  };

  const removeIaColumns = (indexToRemove: number) => {
    const newIaColumns = iaColumns.filter(
      (_, index) => index !== indexToRemove
    );
    // Update column names to maintain sequential numbering
    const updatedIaColumns = newIaColumns.map(
      (column, index) => `IA-${index + 1}`
    );
    setIaColumns(updatedIaColumns);
    setReachMaxColumnMsg({ status: false, msg: "" });
  };

  const addLabColumns = () => {
    if (labColumns.length < 5) {
      const newLabColumns = [...labColumns];
      const newColumnIndex = newLabColumns.length + 1;
      newLabColumns.push(`LAB-${newColumnIndex} %`);
      setLabColumns(newLabColumns);
    } else {
      // Handle max limit reached
      setReachMaxColumnMsg({
        status: true,
        msg: "You have reached the maximum limit. You can't add more than 5 LAB columns.",
      });
    }
  };

  const removeLabColumns = (indexToRemove: number) => {
    const newLabColumns = labColumns.filter(
      (_, index) => index !== indexToRemove
    );
    // Update column names to maintain sequential numbering
    const updatedLabColumns = newLabColumns.map(
      (column, index) => `LAB-${index + 1} %`
    );
    setLabColumns(updatedLabColumns);
    setReachMaxColumnMsg({ status: false, msg: "" });
  };

  return (
    <>
      {reachMaxColumnMsg.status && (
        <Alert
          key="danger"
          variant="danger"
          onClose={() => setReachMaxColumnMsg({ status: false, msg: "" })}
          dismissible
        >
          {reachMaxColumnMsg.msg}
        </Alert>
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={(values, action) => {
          setActiveTab(5);
        }}
      >
        {({ isSubmitting, errors, touched, handleChange }) => (
          <Form>
            <div className="table-responsive admin-table-wrapper copo-table mt-3">
              <Table borderless striped>
                <thead>
                  <tr>
                    <th>Course Outcomes</th>
                    {/* ===== Test column created ===== */}
                    {testColumns.map((column, index) => (
                      <th key={column}>
                        {column}{" "}
                        {index >= 2 && (
                          <OverlayTrigger
                            placement="top"
                            overlay={<BsTooltip>Delete Test Column</BsTooltip>}
                          >
                            <Button
                              style={{
                                backgroundColor: "#f2f2f2",
                                padding: "3px",
                              }}
                            >
                              <img
                                src={deleteIcon}
                                alt="Delete"
                                onClick={() => removeTestColumns(index)}
                              />
                            </Button>
                          </OverlayTrigger>
                        )}
                      </th>
                    ))}

                    {/* ===== IA column created ===== */}
                    {iaColumns.map((column, index) => (
                      <th key={column}>
                        {column}{" "}
                        {index >= 2 && (
                          <OverlayTrigger
                            placement="top"
                            overlay={<BsTooltip>Delete IA Column</BsTooltip>}
                          >
                            <Button
                              style={{
                                backgroundColor: "#f2f2f2",
                                padding: "3px",
                              }}
                            >
                              <img
                                src={deleteIcon}
                                alt="Delete"
                                onClick={() => removeIaColumns(index)}
                              />
                            </Button>
                          </OverlayTrigger>
                        )}
                      </th>
                    ))}

                    {/* ===== LAB column created ===== */}
                    {labColumns.map((column, index) => (
                      <th key={column}>
                        {column}{" "}
                        {index >= 1 && (
                          <OverlayTrigger
                            placement="top"
                            overlay={<BsTooltip>Delete LAB Column</BsTooltip>}
                          >
                            <Button
                              style={{
                                backgroundColor: "#f2f2f2",
                                padding: "3px",
                              }}
                            >
                              <img
                                src={deleteIcon}
                                alt="Delete"
                                onClick={() => removeLabColumns(index)}
                              />
                            </Button>
                          </OverlayTrigger>
                        )}
                      </th>
                    ))}
                    <th>ESE %</th>
                    <th>Average Assessment %</th>
                    {/* Add other table headers here */}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item) => (
                    <tr>
                      <td>{item.courseOutcomes}</td>
                      {/* ===== Test column data ===== */}
                      {testColumns.map((column) => (
                        <td key={column}>
                          <SelectCell name={column} options={quizOptions} />
                        </td>
                      ))}

                      {/* ===== IA column data ===== */}
                      {iaColumns.map((column) => (
                        <td key={column}>
                          <SelectCell name={column} options={iaOptions} />
                        </td>
                      ))}

                      {/* ===== LAB column data ===== */}
                      {labColumns.map((column) => (
                        <td key={column}>
                          <SelectCell name={column} options={labOptions} />
                        </td>
                      ))}
                      <td>
                        <Field
                          type="text"
                          placeholder="ESE %"
                          name="ese"
                          className="form-control"
                        />
                      </td>
                      <td>{item.average}</td>
                      {/* Add other table cells here */}
                    </tr>
                  ))}
                </tbody>
              </Table>
              <AssessmentButtons
                addIaColumns={addIaColumns}
                addLabColumns={addLabColumns}
                addTestColumns={addTestColumns}
              />
            </div>

            <div className="modal-buttons">
              <CustomButton
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                btnText="Save & Continue"
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AssessmentTable;

const tableData = [
  {
    courseOutcomes: "AIT_CO 1",
    average: "88.86",
  },
  {
    courseOutcomes: "AIT_CO 2",
    average: "89.54",
  },
  {
    courseOutcomes: "AIT_CO 3",
    average: "78.63",
  },
];

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
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
import Swal from "sweetalert2";
import Errordiv from "../../../../widgets/alert/errordiv";
import TableSkeleton from "../../../../widgets/skeleton/table";

const AssessmentTable = ({
  apiStatus,
  setActiveTab,
  assessmentData,
  refreshToggle,
  initialValues,
  setInitialValue,
}: any) => {
  const { cid } = useParams();
  const [testColumns, setTestColumns] = useState(["Test-1"]); // Initial Test columns
  const [iaColumns, setIaColumns] = useState(["IA-1"]); // Initial IA columns
  const [labColumns, setLabColumns] = useState(["LAB-1 %"]); // Initial LAB columns
  const [reachMaxColumnMsg, setReachMaxColumnMsg] = useState({
    status: false,
    msg: "",
  });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState({
    message: "",
    alertBoxColor: "",
  });

  const quizOptions = [
    { value: 1, label: "Quiz 1" },
    { value: 2, label: "Quiz 2" },
    { value: 3, label: "Quiz 3" },
    { value: 4, label: "Quiz 4" },
    { value: 5, label: "Quiz 5" },
  ];

  const iaOptions = [
    { value: 6, label: "Quiz 1" },
    { value: 7, label: "Quiz 2" },
    { value: 8, label: "Quiz 3" },
    { value: 9, label: "Quiz 4" },
    { value: 10, label: "Quiz 5" },
  ];

  const labOptions = [
    { value: 11, label: "Assignment 1" },
    { value: 12, label: "Assignment 2" },
    { value: 13, label: "Assignment 3" },
    { value: 14, label: "Assignment 4" },
    { value: 15, label: "Assignment 5" },
  ];

  const addTestColumns = () => {
    if (testColumns.length < 5) {
      const newTestColumns = [...testColumns];
      const newColumnIndex = newTestColumns.length + 1;
      newTestColumns.push(`Test-${newColumnIndex}`);
      setTestColumns(newTestColumns);
    } else {
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
    const updatedLabColumns = newLabColumns.map(
      (column, index) => `LAB-${index + 1} %`
    );
    setLabColumns(updatedLabColumns);
    setReachMaxColumnMsg({ status: false, msg: "" });
  };

  const handleFormSubmit = (
    values: { [x: string]: any },
    action: FormikHelpers<any>
  ) => {
    const formattedData = assessmentData.map(
      (assessment: { id: any; abbreviation: any; suffixValue: any }) => {
        const formattedAssessment = {
          id: assessment.id,
          abbreviation: assessment.abbreviation,
          suffixValue: assessment.suffixValue,
          eseMark: values[`eseMark_${assessment.id}`],
          assements: [],
        };

        testColumns.forEach((column, index) => {
          const key = `test_${assessment.id}_${index + 1}`;
          if (values[key]) {
            formattedAssessment.assements.push({
              suffixValue: index + 1,
              assessmentType: "test",
              idNumber: values[key],
            });
          }
        });

        iaColumns.forEach((column, index) => {
          const key = `ia_${assessment.id}_${index + 1}`;
          if (values[key]) {
            formattedAssessment.assements.push({
              suffixValue: index + 1,
              assessmentType: "ia",
              idNumber: values[key],
            });
          }
        });

        labColumns.forEach((column, index) => {
          const key = `lab_${assessment.id}_${index + 1}`;
          if (values[key]) {
            formattedAssessment.assements.push({
              suffixValue: index + 1,
              assessmentType: "lab",
              idNumber: values[key],
            });
          }
        });

        if (formattedAssessment.assements.length > 0) {
          return formattedAssessment;
        }
      }
    );

    let dataPacket = formattedData.filter(
      (data: undefined) => data !== undefined
    );

    if (Object.keys(values).length != 0) {
      action.setSubmitting(true);
      postData(`/${cid}/assessment/mapping`, dataPacket)
        .then((res: { data: string; status: number }) => {
          if (res.data !== "" && res.status === 200) {
            console.log(res.data);
            action.setSubmitting(false);
            refreshToggle();
          }
          action.resetForm();
        })
        .catch((error: { response: { data: { message: any } } }) => {
          action.setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: error.response.data.message,
            alertBoxColor: "danger",
          });
        });
    }
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
       {apiStatus !== "started" ? (
      <Formik
        initialValues={initialValues}
        onSubmit={(values, action) => {
          handleFormSubmit(values, action);
        }}
      >
        {({ isSubmitting, handleChange, values }) => (
          <Form>
            <div className="table-responsive admin-table-wrapper copo-table mt-3">
              <Table borderless striped>
                <thead>
                  <tr>
                    <th>Course Outcomes</th>
                    {testColumns.map((column, index) => (
                      <th key={column}>
                        {column}{" "}
                        {index >= 1 && (
                          <OverlayTrigger
                            placement="top"
                            overlay={<BsTooltip>Delete Test Column</BsTooltip>}
                          >
                            <Button
                              style={{
                                backgroundColor: "#f2f2f2",
                                padding: "3px",
                              }}
                              onClick={() => removeTestColumns(index)}
                            >
                              <img src={deleteIcon} alt="Delete" />
                            </Button>
                          </OverlayTrigger>
                        )}
                      </th>
                    ))}
                    {iaColumns.map((column, index) => (
                      <th key={column}>
                        {column}{" "}
                        {index >= 1 && (
                          <OverlayTrigger
                            placement="top"
                            overlay={<BsTooltip>Delete IA Column</BsTooltip>}
                          >
                            <Button
                              style={{
                                backgroundColor: "#f2f2f2",
                                padding: "3px",
                              }}
                              onClick={() => removeIaColumns(index)}
                            >
                              <img src={deleteIcon} alt="Delete" />
                            </Button>
                          </OverlayTrigger>
                        )}
                      </th>
                    ))}
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
                              onClick={() => removeLabColumns(index)}
                            >
                              <img src={deleteIcon} alt="Delete" />
                            </Button>
                          </OverlayTrigger>
                        )}
                      </th>
                    ))}
                    <th>ESE %</th>
                    <th>Average Assessment %</th>
                  </tr>
                </thead>
                <tbody>
                  {assessmentData.map(
                    (assessment: {
                      id: React.Key | null | undefined;
                      abbreviation: any;
                      suffixValue: any;
                    }) => (
                      <tr key={assessment.id}>
                        <td>{`${assessment.abbreviation}_${assessment.suffixValue}`}</td>
                        {testColumns.map((column, index) => (
                          <td key={column}>
                            <Field
                              as="select"
                              name={`test_${assessment.id}_${index + 1}`}
                              className="form-select"
                              onChange={(e: { target: { value: any } }) => {
                                handleChange(e);
                                setInitialValue((prevState: any) => ({
                                  ...prevState,
                                  [`test_${assessment.id}_${index + 1}`]:
                                    e.target.value,
                                }));
                              }}
                            >
                              <option value="">Select</option>
                              {quizOptions.map((optionValue) => (
                                <option
                                  key={optionValue.value}
                                  value={optionValue.value}
                                  selected = {`test_${assessment.id}_${index + 1}`===`test_${assessment.id}_1`} 
                                >
                                  {optionValue.label}
                                </option>
                              ))}
                            </Field>
                          </td>
                        ))}
                        {iaColumns.map((column, index) => (
                          <td key={column}>
                            <Field
                              as="select"
                              name={`ia_${assessment.id}_${index + 1}`}
                              className="form-select"
                              onChange={(e: { target: { value: any } }) => {
                                handleChange(e);
                                setInitialValue((prevState: any) => ({
                                  ...prevState,
                                  [`ia_${assessment.id}_${index + 1}`]:
                                    e.target.value,
                                }));
                              }}
                            >
                              <option value="">Select</option>
                              {iaOptions.map((optionValue) => (
                                <option
                                  key={optionValue.value}
                                  value={optionValue.value}
                                  selected = {`ia_${assessment.id}_${index + 1}`==="ia_88_1"} 
                                >
                                  {optionValue.label}
                                </option>
                              ))}
                            </Field>
                          </td>
                        ))}
                        {labColumns.map((column, index) => (
                          <td key={column}>
                            <Field
                              as="select"
                              name={`lab_${assessment.id}_${index + 1}`}
                              className="form-select"
                              onChange={(e: { target: { value: any } }) => {
                                handleChange(e);
                                setInitialValue((prevState: any) => ({
                                  ...prevState,
                                  [`lab_${assessment.id}_${index + 1}`]:
                                    e.target.value,
                                }));
                              }}
                            >
                              <option value="">Select</option>
                              {labOptions.map((optionValue, index) => (
                                <option
                                  key={optionValue.value}
                                  value={optionValue.value}
                                  selected={
                                    `lab_${assessment.id}_${index + 1}` ===
                                    `lab_88_1`
                                  }
                                >
                                  {optionValue.label}
                                </option>
                              ))}
                            </Field>
                          </td>
                        ))}
                        <td>
                          <Field
                            type="number"
                            placeholder="ESE %"
                            name={`eseMark_${assessment.id}`}
                            className="form-control"
                            onChange={(e: { target: { value: any } }) => {
                              handleChange(e);
                              setInitialValue((prevState: any) => ({
                                ...prevState,
                                [`eseMark_${assessment.id}`]: e.target.value,
                              }));
                            }}
                            value={initialValues[`eseMark_${assessment.id}`]}
                          />
                        </td>
                        <td></td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>

              {apiStatus === "started" &&
                  assessmentData.length === 0 && (
                    <TableSkeleton numberOfRows={5} numberOfColumns={4} />
                  )}
                {apiStatus === "finished" &&
                  assessmentData.length === 0 && (
                    <Errordiv msg="No record found!" cstate className="mt-3" />
                  )}
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
      ) : (
        <RouterLadyLoader status={true} />
      )}
    </>
  );
};

export default AssessmentTable;

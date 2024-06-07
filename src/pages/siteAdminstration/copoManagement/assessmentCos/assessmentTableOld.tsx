import * as Yup from "yup";
import Swal from "sweetalert2";
import SelectCell from "../selectCell";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AssessmentButtons from "./assessmentButtons";
import Errordiv from "../../../../widgets/alert/errordiv";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { postData } from "../../../../adapters/microservices";
import TableSkeleton from "../../../../widgets/skeleton/table";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import deleteIcon from "../../../../assets/images/icons/delete-action.svg";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import RouterLadyLoader from "../../../../globals/globalLazyLoader/routerLadyLoader";
import {
  Alert,
  Table,
  Button,
  OverlayTrigger,
  Tooltip as BsTooltip,
} from "react-bootstrap";

const AssessmentTable = ({
  apiStatus,
  setActiveTab,
  refreshToggle,
  initialValues,
  assessmentData,
  setInitialValue,
  assessmentMoodleData,
}: any) => {
  const { cid } = useParams();
  const [iaColumns, setIaColumns] = useState(["IA-1"]); // Initial IA columns
  const [labColumns, setLabColumns] = useState(["LAB-1 %"]); // Initial LAB columns
  const [buttonClicked, setButtonClicked] = useState("");
  const [isSubmittingSave, setIsSubmittingSave] = useState(false);
  const [isSubmittingSaveAndContinue, setIsSubmittingSaveAndContinue] =
    useState(false);
  const [reachMaxColumnMsg, setReachMaxColumnMsg] = useState({
    status: false,
    msg: "",
  });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState({
    message: "",
    alertBoxColor: "",
  });

  // add IA column === >>>
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

  // remove IA column === >>>
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

  // add lab column === >>>
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

  // remove lab column === >>>
  const removeLabColumns = (indexToRemove: number, suffix: any) => {

    console.log(indexToRemove)
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
      const submitAction =
        buttonClicked === "save"
          ? setIsSubmittingSave
          : setIsSubmittingSaveAndContinue;
      submitAction(true);
      postData(`/${cid}/assessment/mapping`, dataPacket)
        .then((res: { data: string; status: number }) => {
          if (res.data !== "" && res.status === 200) {
            if (buttonClicked === "save") {
              Swal.fire({
                timer: 3000,
                width: "25em",
                color: "#666",
                icon: "success",
                background: "#e7eef5",
                showConfirmButton: false,
                text: "Assessment for course outcomes (Direct) saved successfully.",
              });
            } else if (buttonClicked === "saveAndContinue") {
              Swal.fire({
                timer: 3000,
                width: "25em",
                color: "#666",
                icon: "success",
                background: "#e7eef5",
                showConfirmButton: false,
                text: "Assessment for course outcomes (Direct) saved successfully. Moving to the next step.",
              });
              setTimeout(() => {
                setActiveTab(5);
              }, 3000);
            }
            refreshToggle();
          }
          submitAction(false);
        })
        .catch((error: { response: { data: { message: any } } }) => {
          action.setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: error.response.data.message,
            alertBoxColor: "danger",
          });
          submitAction(false);
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
                                onClick={() => removeLabColumns(index,column)}
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
                                {assessmentMoodleData.length > 0 && assessmentMoodleData.map((item: { coname: string; mod_quiz: any[]; }) => {
                                  const isMatchingConame = `${assessment.abbreviation}${assessment.suffixValue}` === item.coname;
                                  return isMatchingConame && item.mod_quiz !== undefined && item.mod_quiz.map((el) => {
                                    const isSelected = assessment.assements.some((assessmentItem: { idNumber: any; }) => assessmentItem.idNumber == el.cmid);
                                    return (
                                      <option key={el.id} value={el.cmid} selected={isSelected}>
                                        {el.name}
                                      </option>
                                    );
                                  });
                                })}
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
                                <option value={0}>Select</option>
                                {assessmentMoodleData.length > 0 && assessmentMoodleData.map((item: { coname: string; mod_assign: any[]; }) => {
                                  const isMatchingConame = `${assessment.abbreviation}${assessment.suffixValue}` === item.coname;
                                  return isMatchingConame && item.mod_assign !== undefined && item.mod_assign.map((el) => {
                                    const isSelected = assessment.assements.some((assessmentItem: { idNumber: any; }) => assessmentItem.idNumber == el.cmid);
                                    return (
                                      <option key={el.id} value={el.cmid} selected={isSelected}>
                                        {el.name}
                                      </option>
                                    );
                                  });
                                })}
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

                {apiStatus === "started" && assessmentData.length === 0 && (
                  <TableSkeleton numberOfRows={5} numberOfColumns={4} />
                )}
                {apiStatus === "finished" && assessmentData.length === 0 && (
                  <Errordiv msg="No record found!" cstate className="mt-3" />
                )}
                <AssessmentButtons
                  addIaColumns={addIaColumns}
                  addLabColumns={addLabColumns}
                  assessmentData={assessmentData}
                />
              </div>

              <div className="modal-buttons">
                <CustomButton
                  type="submit"
                  variant="primary"
                  isSubmitting={isSubmittingSave}
                  disabled={assessmentData.length === 0}
                  onClick={() => setButtonClicked("save")}
                  btnText={!isSubmittingSave ? "Save" : "Saving..."}
                />{" "}
                <CustomButton
                  type="submit"
                  variant="primary"
                  disabled={assessmentData.length === 0}
                  isSubmitting={isSubmittingSaveAndContinue}
                  onClick={() => setButtonClicked("saveAndContinue")}
                  btnText={
                    !isSubmittingSaveAndContinue
                      ? "Save & Continue"
                      : "Loading..."
                  }
                />{" "}
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

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
import { AnyObject } from "yup/lib/types";

const AssessmentTable = ({
  apiStatus,
  setActiveTab,
  refreshToggle,
  assessmentData,
  tabRefreshToggle,
  assessmentMoodleData,
  highestLabSuffixValue,
  highestIaSuffixValue,
}: any) => {
  const { cid } = useParams();
  const [labs, setLabs] = useState<string[]>([]);
  const [iaColumns, setIaColumns] = useState<string[]>([]);
  const [initialValues, setInitialValues] = useState({});
  const [buttonClicked, setButtonClicked] = useState("");
  const [isSubmittingSave, setIsSubmittingSave] = useState(false);
  const [isSubmittingSaveAndContinue, setIsSubmittingSaveAndContinue] =
    useState(false);
  const [reachMaxColumnMsg, setReachMaxColumnMsg] = useState({
    status: false,
    msg: "",
  });

  // ESE field validation === >>>
  const validationSchema = Yup.object(
    assessmentData.reduce(
      (
        acc: { [x: string]: Yup.NumberSchema<number | null | undefined, AnyObject, number | null | undefined>; },
        assessment: { id: any; }
      ) => {
        acc[`eseMark_${assessment.id}`] = Yup.number()
          .nullable()
          .integer("Only integer values are allowed.")
          .min(0, "Only non-negative values are allowed.")
          .typeError("Only digits are allowed.");
        return acc;
      },
      {}
    )
  );

  // set max lab columns === >>>
  useEffect(() => {
    let multipleLabColumn = [];
    if (highestLabSuffixValue === 0) {
      setLabs(["LAB-1 %"]);
    } else {
      for (
        let i = highestLabSuffixValue === 0 ? 2 : 1;
        i <= highestLabSuffixValue;
        i++
      ) {
        multipleLabColumn.push(`LAB-${i} %`);
      }
      setLabs(multipleLabColumn);
    }
  }, [highestLabSuffixValue]);

  // set max ia columns === >
  useEffect(() => {
    let multipleIaColumn = [];
    if (highestIaSuffixValue === 0) {
      setIaColumns(["IA-1 %"]);
    } else {
      for (
        let i = highestIaSuffixValue === 0 ? 2 : 1;
        i <= highestIaSuffixValue;
        i++
      ) {
        multipleIaColumn.push(`IA-${i} %`);
      }
      setIaColumns(multipleIaColumn);
    }
  }, [highestIaSuffixValue]);

  // add ia column handler === >>>
  const addIaColumn = () => {
    if (iaColumns.length < 5) {
      const newIa = `IA-${iaColumns.length + 1} %`;
      setIaColumns([...iaColumns, newIa]);
    } else {
      setReachMaxColumnMsg({
        status: true,
        msg: "You have reached the maximum limit. You can't add more than 5 IA columns.",
      });
    }
  };

  // remove ia column handler === >>>
  const removeIaColumn = () => {
    if (iaColumns.length > 0) {
      setIaColumns(iaColumns.slice(0, -1));
      setReachMaxColumnMsg({ status: false, msg: "" });
    }
  };

  // add lab column handler === >>>
  const addLabColumn = () => {
    if (labs.length < 5) {
      const newLab = `LAB-${labs.length + 1} %`;
      setLabs([...labs, newLab]);
    } else {
      setReachMaxColumnMsg({
        status: true,
        msg: "You have reached the maximum limit. You can't add more than 5 LAB columns.",
      });
    }
  };

  // remove lab column handler === >>>
  const removeLabColumn = () => {
    if (labs.length > 0) {
      setLabs(labs.slice(0, -1));
      setReachMaxColumnMsg({ status: false, msg: "" });
    }
  };

  // remove lab column logic === >>>
  const removeColumnsHandler = (
    indexToRemove: number,
    assessmentType: string
  ) => {
    let filteredDataPacket: any[] = [];
    assessmentData.map(
      (assessment: {
        id: any;
        abbreviation: any;
        suffixValue: any;
        eseMark: any;
        assements: any[];
      }) => {
        const formattedAssessment = {
          id: assessment.id,
          abbreviation: assessment.abbreviation,
          suffixValue: assessment.suffixValue,
          eseMark: assessment.eseMark,
          assements: [],
        };
        if (assessmentType === "lab") {
          assessment.assements.filter((asses) => {
            if (
              `${asses.assessmentType}-${asses.suffixValue}` ==
              `lab-${indexToRemove + 1}`
            ) {
              asses.deleted = true;
              formattedAssessment.assements.push(asses);
            }
          });
          if (formattedAssessment.assements.length !== 0) {
            filteredDataPacket.push(formattedAssessment);
          }
        } else {
          assessment.assements.filter((quiz) => {
            if (
              `${quiz.assessmentType}-${quiz.suffixValue}` ==
              `ia-${indexToRemove + 1}`
            ) {
              quiz.deleted = true;
              formattedAssessment.assements.push(quiz);
            }
          });
          if (formattedAssessment.assements.length !== 0) {
            filteredDataPacket.push(formattedAssessment);
          }
        }
      }
    );

    postData(`/${cid}/assessment/mapping`, filteredDataPacket)
      .then((res: { data: string; status: number }) => {
        if (res.data !== "" && res.status === 200) {
          Swal.fire({
            timer: 3000,
            width: "25em",
            color: "#666",
            icon: "success",
            background: "#e7eef5",
            showConfirmButton: false,
            text: `${
              assessmentType === "lab" ? "LAB" : "IA"
            } column has been removed.`,
          });

          if (assessmentType === "lab") {
            removeLabColumn();
          } else {
            removeIaColumn();
          }
        }
      })
      .catch((error: { response: { data: { message: any } } }) => {
        console.log(error);
      });
  };

  // set initial values === >>>
  useEffect(() => {
    const initialData = assessmentData.reduce(
      (
        acc: { [x: string]: any },
        item: { assements: any[]; id: any; eseMark: any }
      ) => {
        item.assements.forEach((data) => {
          const assessmentKey = `${data.assessmentType}_${item.id}_${data.suffixValue}`;
          const eseMarkKey = `eseMark_${item.id}`;

          acc[assessmentKey] = data.idNumber;
          acc[eseMarkKey] = item.eseMark;
        });
        return acc;
      },
      {}
    );
    setInitialValues(initialData);
  }, [assessmentData]);

  // form on-submit handler === >>>
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
          eseMark: initialValues[`eseMark_${assessment.id}`],
          assements: [],
        };

        iaColumns.forEach((column, index) => {
          const key = `ia_${assessment.id}_${index + 1}`;
          if (initialValues[key]) {
            formattedAssessment.assements.push({
              suffixValue: index + 1,
              assessmentType: "ia",
              idNumber: initialValues[key],
            });
          }
        });

        labs.forEach((column, index) => {
          const key = `lab_${assessment.id}_${index + 1}`;
          if (initialValues[key]) {
            formattedAssessment.assements.push({
              suffixValue: index + 1,
              assessmentType: "lab",
              idNumber: initialValues[key],
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
              tabRefreshToggle();
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
              tabRefreshToggle();
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
          // setShowAlert(true);
          // setAlertMsg({
          //   message: error.response.data.message,
          //   alertBoxColor: "danger",
          // });
          submitAction(false);
        });
    } else {
      if (buttonClicked === "saveAndContinue") {
        setActiveTab(5);
      }
    }
  };

  return (
    <div>
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
        validationSchema={validationSchema}
        onSubmit={(values, action) => {
          handleFormSubmit(values, action);
        }}
      >
        {({ handleChange, errors, touched, setFieldValue }) => (
          <Form>
            <Table borderless striped>
              <thead>
                <tr>
                  <th>Course Outcomes</th>
                  {iaColumns.map((ia, index) => (
                    <th key={index}>
                      {ia}{" "}
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
                            onClick={() => removeColumnsHandler(index, "ia")}
                          >
                            <img src={deleteIcon} alt="Delete" />
                          </Button>
                        </OverlayTrigger>
                      )}
                    </th>
                  ))}
                  {labs.map((lab, index) => (
                    <th key={index}>
                      {lab}{" "}
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
                            onClick={() => removeColumnsHandler(index, "lab")}
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
                    eseMark:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                    averageAssessmentDirect:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                  }) => (
                    <tr key={assessment.id}>
                      <td>{`${assessment.abbreviation}_${assessment.suffixValue}`}</td>
                      {iaColumns.map((ia, index) => (
                        <td key={index}>
                          <Field
                            as="select"
                            className="form-select"
                            name={`ia_${assessment.id}_${index + 1}`}
                            onChange={(e: { target: { value: any } }) => {
                              handleChange(e);
                              setInitialValues((prevState: any) => ({
                                ...prevState,
                                [`ia_${assessment.id}_${index + 1}`]:
                                  e.target.value,
                              }));
                            }}
                          >
                            <option value={0}>Select</option>
                            {Array.isArray(assessmentMoodleData) &&
                              assessmentMoodleData.map(
                                (option: { coname: string; mod_quiz: any[] }) =>
                                  option.coname !== "" &&
                                  option.coname ===
                                    `${assessment.abbreviation}${assessment.suffixValue}` &&
                                  option.mod_quiz?.length > 0 &&
                                  option.mod_quiz.map((quiz) => {
                                    // Check if the key exists in initialValues
                                    const selectedValue = Object.entries(
                                      initialValues
                                    ).find(
                                      ([key, value]) =>
                                        key ===
                                        `ia_${assessment.id}_${index + 1}`
                                    )?.[1];
                                    return (
                                      <>
                                        {quiz.cmid !== null &&
                                          quiz.name !== null && (
                                            <option
                                              key={quiz.cmid}
                                              value={quiz.cmid}
                                              selected={
                                                selectedValue == quiz.cmid
                                                  ? true
                                                  : false
                                              }
                                            >
                                              {quiz.name}
                                            </option>
                                          )}
                                      </>
                                    );
                                  })
                              )}
                          </Field>
                        </td>
                      ))}
                      {labs.map((lab, index) => (
                        <td key={index}>
                          <Field
                            as="select"
                            className="form-select"
                            name={`lab_${assessment.id}_${index + 1}`}
                            onChange={(e: { target: { value: any } }) => {
                              handleChange(e);
                              setInitialValues((prevState: any) => ({
                                ...prevState,
                                [`lab_${assessment.id}_${index + 1}`]:
                                  e.target.value,
                              }));
                            }}
                          >
                            <option value={0}>Select</option>
                            {Array.isArray(assessmentMoodleData) &&
                              assessmentMoodleData.map(
                                (option: {
                                  coname: string;
                                  mod_assign: any[];
                                }) =>
                                  option.coname ===
                                    `${assessment.abbreviation}${assessment.suffixValue}` &&
                                  option.mod_assign?.length > 0 &&
                                  option.mod_assign.map((assign) => {
                                    // Check if the key exists in initialValues
                                    const selectedValue = Object.entries(
                                      initialValues
                                    ).find(
                                      ([key, value]) =>
                                        key ===
                                        `lab_${assessment.id}_${index + 1}`
                                    )?.[1];
                                    return (
                                      <>
                                        {assign.cmid !== null &&
                                          assign.name !== null && (
                                            <option
                                              key={assign.cmid}
                                              value={assign.cmid}
                                              selected={
                                                selectedValue == assign.cmid
                                                  ? true
                                                  : false
                                              }
                                            >
                                              {assign.name}
                                            </option>
                                          )}
                                      </>
                                    );
                                  })
                              )}
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
                            setInitialValues((prevState: any) => ({
                              ...prevState,
                              [`eseMark_${assessment.id}`]: e.target.value,
                            }));
                          }}
                          value={initialValues[`eseMark_${assessment.id}`]}
                        />
                        <FieldErrorMessage
                          errors={errors[`eseMark_${assessment.id}`]}
                          touched={touched[`eseMark_${assessment.id}`]}
                        />
                      </td>
                      <td>{assessment.averageAssessmentDirect}</td>
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
              addIaColumns={addIaColumn}
              addLabColumns={addLabColumn}
              assessmentData={assessmentData}
            />
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
    </div>
  );
};

export default AssessmentTable;

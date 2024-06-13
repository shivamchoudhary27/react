import { Alert, Table } from "react-bootstrap";
import { Field, Formik, Form } from "formik";
import Errordiv from "../../../../widgets/alert/errordiv";
import { postData } from "../../../../adapters/microservices";
import TableSkeleton from "../../../../widgets/skeleton/table";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import RouterLadyLoader from "../../../../globals/globalLazyLoader/routerLadyLoader";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

type Props = {
  setActiveTab: any;
  tabRefreshToggle: any;
  courseAttainmentData: any;
  courseAttainmentApiStatus: string;
  courseAttainmentMoodleData: any;
};

const AttainmentTable = (props: Props) => {
  const { cid } = useParams();
  const [buttonClicked, setButtonClicked] = useState("");
  const [isSubmittingSave, setIsSubmittingSave] = useState(false);
  const [isSubmittingSaveAndContinue, setIsSubmittingSaveAndContinue] =
    useState(false);
  const [apiCatchError, setApiCatchError] = useState({
    status: false,
    msg: "",
  });
  const [initialValues, setInitialValues] = useState({});

  //  // set initial values === >>>
  useEffect(() => {
    const initialData = props.courseAttainmentData.reduce(
      (
        acc: { [x: string]: any },
        item: { id: any; feedbackIdNumber: any },
        index: any
      ) => {
        const attainmentKey = `feedback_${item.id}`;
        acc[attainmentKey] = item.feedbackIdNumber;
        return acc;
      },
      {}
    );
    setInitialValues(initialData);
  }, [props.courseAttainmentData]);

  const handleSubmit = (values: any, action: any) => {
    const formattedData = props.courseAttainmentData.map(
      (
        attainment: {
          id: any;
          target: any;
          suffixValue: any;
          abbreviation: any;
          attainmentLevel: any;
          averageAssessmentDirect: any;
        },
        index: any
      ) => {
        const formattedAttainment = {
          id: attainment.id,
          target: attainment.target,
          suffixValue: attainment.suffixValue,
          abbreviation: attainment.abbreviation,
          attainmentLevel: attainment.attainmentLevel,
          averageAssessmentDirect: attainment.averageAssessmentDirect,
          feedbackIdNumber: initialValues[`feedback_${attainment.id}`],
        };
        return formattedAttainment;
      }
    );

    if (Object.keys(values).length != 0) {
      const submitAction =
        buttonClicked === "save"
          ? setIsSubmittingSave
          : setIsSubmittingSaveAndContinue;
      submitAction(true);
      postData(`/${cid}/attainment/mapping`, formattedData)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            if (buttonClicked === "save") {
              // props.tabRefreshToggle()
              Swal.fire({
                timer: 3000,
                width: "25em",
                color: "#666",
                icon: "success",
                background: "#e7eef5",
                showConfirmButton: false,
                text: "Attainment of course outcomes saved successfully.",
              });
            } else if (buttonClicked === "saveAndContinue") {
              props.tabRefreshToggle();
              Swal.fire({
                timer: 3000,
                width: "25em",
                color: "#666",
                icon: "success",
                background: "#e7eef5",
                showConfirmButton: false,
                text: "Attainment of course outcomes saved successfully. Moving to the next step.",
              });
              setTimeout(() => {
                props.setActiveTab(6);
              }, 3000);
            }
            setApiCatchError({
              status: false,
              msg: "",
            });
          }
          submitAction(false);
        })
        .catch((err: any) => {
          console.log(err);
          setApiCatchError({
            status: true,
            msg: err.message,
          });
        });
    } else {
      if (buttonClicked === "saveAndContinue") {
        props.setActiveTab(6);
      }
    }
  };

  return (
    <>
      {apiCatchError.status && (
        <Alert
          key="danger"
          variant="danger"
          onClose={() => setApiCatchError({ status: false, msg: "" })}
          dismissible
        >
          {apiCatchError.msg}
        </Alert>
      )}
      {props.courseAttainmentApiStatus !== "started" ? (
        <Formik
          initialValues={initialValues}
          onSubmit={(values, action) => {
            handleSubmit(values, action);
          }}
        >
          {({ isSubmitting, handleChange }) => (
            <Form>
              <div className="table-responsive admin-table-wrapper copo-table mt-3">
                <Table borderless striped className="attandence-table">
                  <thead>
                    <tr>
                      <th>Course Outcomes</th>
                      <th colSpan={2}>Assessment in %</th>
                      <th>Average Assessment</th>
                      <th>Target Set</th>
                      <th>Attainment Level</th>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <strong>Direct (D)</strong>
                      </td>
                      <td>
                        <strong>Indirect (I)</strong>
                      </td>
                      <td>
                        <strong>(0.8*D + 0.2*I)</strong>
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {props.courseAttainmentData.map(
                      (item: any, index: number) => (
                        <tr key={index}>
                          <td>{`${item.abbreviation}_${item.suffixValue}`}</td>
                          <td>{item.averageAssessmentDirect}</td>
                          <td>
                            <Field
                              as="select"
                              name={`feedback_${item.id}`}
                              className="form-select"
                              onChange={(e: { target: { value: any } }) => {
                                handleChange(e);
                                setInitialValues((prevState: any) => ({
                                  ...prevState,
                                  [`feedback_${item.id}`]: e.target.value,
                                }));
                              }}
                            >
                              <option value={0}>Select</option>
                              {Array.isArray(
                                props.courseAttainmentMoodleData
                              ) &&
                                props.courseAttainmentMoodleData.map(
                                  (option, index: number) =>
                                    option.coname !== "" &&
                                    option.coname ===
                                      `${item.abbreviation}${item.suffixValue}` &&
                                    option.mod_feedback?.length > 0 &&
                                    option.mod_feedback.map((feedback: any) => {
                                      const selectedValue = Object.entries(
                                        initialValues
                                      ).find(
                                        ([key, value]) =>
                                          key === `feedback_${item.id}`
                                      )?.[1];

                                      return (
                                        <>
                                          {feedback.cmid !== null &&
                                            feedback.name !== null && (
                                              <option
                                                key={feedback.cmid}
                                                value={feedback.cmid}
                                                selected={
                                                  selectedValue == feedback.cmid
                                                    ? true
                                                    : false
                                                }
                                              >
                                                {feedback.name}
                                              </option>
                                            )}
                                        </>
                                      );
                                    })
                                )}
                            </Field>
                          </td>
                          <td>{item.averageAssessment}</td>
                          <td>{item.target}</td>
                          <td>{item.attainmentLevel}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
                {props.courseAttainmentApiStatus === "started" &&
                  props.courseAttainmentData.length === 0 && (
                    <TableSkeleton numberOfRows={5} numberOfColumns={4} />
                  )}
                {props.courseAttainmentApiStatus === "finished" &&
                  props.courseAttainmentData.length === 0 && (
                    <Errordiv msg="No record found!" cstate className="mt-3" />
                  )}
              </div>
              <div className="modal-buttons">
                <CustomButton
                  type="submit"
                  variant="primary"
                  isSubmitting={isSubmittingSave}
                  disabled={props.courseAttainmentData.length === 0}
                  onClick={() => setButtonClicked("save")}
                  btnText={!isSubmittingSave ? "Save" : "Saving..."}
                />{" "}
                <CustomButton
                  type="submit"
                  variant="primary"
                  isSubmitting={isSubmittingSaveAndContinue}
                  disabled={props.courseAttainmentData.length === 0}
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

export default AttainmentTable;

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { Link, useParams } from "react-router-dom";
import {
  Alert,
  AlertHeading,
  Button,
  ButtonGroup,
  OverlayTrigger,
  Tooltip as BsTooltip,
  Table,
} from "react-bootstrap";
import { postData } from "../../../../adapters/microservices";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import RouterLadyLoader from "../../../../globals/globalLazyLoader/routerLadyLoader";
import * as Yup from "yup";
import SelectCell from "../selectCell";
import deleteIcon from "../../../../assets/images/icons/delete-action.svg";
import TableSkeleton from "../../../../widgets/skeleton/table";
import Errordiv from "../../../../widgets/alert/errordiv";
import Swal from "sweetalert2";

// const initialValues = {};

const MappingTable = ({
  posAverage,
  setActiveTab,
  programOutcomes,
  programOutcomeDtos,
  programoutcomeApiStatus,
  tabRefreshToggle,
}: any) => {
  const { cid } = useParams();
  const [apiStatus, setApiStatus] = useState("");
  const [programOutcomeObj, setProgramOutcomeObj] = useState([]);
  const [poColumns, setPoColumns] = useState(["PO1", "PO2", "PO3"]); // Initial PO columns
  const [buttonClicked, setButtonClicked] = useState("");
  const [isSubmittingSave, setIsSubmittingSave] = useState(false);
  const [isSubmittingSaveAndContinue, setIsSubmittingSaveAndContinue] =
    useState(false);
  const [reachMaxColumnMsg, setReachMaxColumnMsg] = useState({
    status: false,
    msg: "",
  });
  const [apiCatchError, setApiCatchError] = useState({
    status: false,
    msg: "",
  });

  // State to hold the initial values
  // const [initialValues] = useState(
  //   Object.entries(programOutcomeDtos).reduce((acc, [key, value]) => {
  //     value.forEach((el, index) => {
  //       acc[`${el.name}_${key}`] = el.value;
  //     });
  //     return acc;
  //   }, {})
  // );

  const addPoColumn = () => {
    if (poColumns.length < 12) {
      const newPoColumns = [...poColumns];
      const newColumnIndex = newPoColumns.length + 1;
      newPoColumns.push(`PO${newColumnIndex}`);
      setPoColumns(newPoColumns);
    } else {
      // Handle max limit reached
      setReachMaxColumnMsg({
        status: true,
        msg: "You have reached the maximum limit. You can't add more than 12 PO columns.",
      });
    }
  };

  const removePoColumn = (indexToRemove: number) => {
    const newPoColumns = poColumns.filter(
      (_, index) => index !== indexToRemove
    );
    // Update column names to maintain sequential numbering
    const updatedPoColumns = newPoColumns.map(
      (column, index) => `PO${index + 1}`
    );
    setPoColumns(updatedPoColumns);
    setReachMaxColumnMsg({ status: false, msg: "" });
  };

  const handleSubmit = (values: {}, action: FormikHelpers<{}>) => {
    let arr = [];
    let transformedData = Object.entries(values).reduce((acc, [key, val]) => {
      const PO_name = key.split("_")[0];
      const outcome_Id = key.split("_")[1];
      const lastIndexVal = key.substring(key.lastIndexOf("_") + 1);

      if (lastIndexVal !== "") {
        arr.push({
          id: parseInt(lastIndexVal),
          value: parseInt(val),
          name: PO_name.toLowerCase(),
          outcome_Id: outcome_Id,
        });
      } else {
        arr.push({
          value: parseInt(val),
          name: PO_name.toLowerCase(),
          outcome_Id: outcome_Id,
        });
      }

      // Check if outcome_Id exists in acc
      const existingOutcomeIndex = acc.findIndex(
        (item) => item.id === outcome_Id
      );

      if (existingOutcomeIndex === -1) {
        // If outcome_Id doesn't exist, add a new entry
        acc.push({
          id: outcome_Id,
          programOutcomeDtos: arr
            .filter((el) => el.outcome_Id === outcome_Id)
            .map(({ outcome_Id, ...rest }) => rest),
        });
      } else {
        // If outcome_Id exists, update the programOutcomeDtos
        acc[existingOutcomeIndex].programOutcomeDtos = arr
          .filter((el) => el.outcome_Id === outcome_Id)
          .map(({ outcome_Id, ...rest }) => rest);
      }

      return acc;
    }, []);

    setApiStatus("started");
    setApiCatchError({ status: false, msg: "" });
    const submitAction =
      buttonClicked === "save"
        ? setIsSubmittingSave
        : setIsSubmittingSaveAndContinue;
    submitAction(true);
    postData(`/${cid}/programoutcome/level`, transformedData)
      .then((res: any) => {
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
              text: "COs, POs & PSOs level are set and saved successfully.",
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
              text: "COs, POs & PSOs level are set and saved successfully. Moving to the next step.",
            });
            setTimeout(() => {
              setActiveTab(4);
            }, 3000);
          }
          setApiStatus("finished");
          setApiCatchError({ status: false, msg: "" });
        }
        submitAction(false);
      })
      .catch((err: any) => {
        setApiStatus("finished");
        if (err.response.status === 500) {
          setApiCatchError({
            status: true,
            msg: `${err.message}: ${err.response.data.errorCode}`,
          });
        }
        submitAction(false);
      });
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
      {programoutcomeApiStatus !== "started" ? (
        <Formik
          initialValues={{}}
          onSubmit={(values, action) => {
            handleSubmit(values, action);
          }}
        >
          {({ isSubmitting, errors, touched, handleChange }) => (
            <Form>
              <div className="table-responsive admin-table-wrapper copo-table mt-3">
                <Table borderless striped className="attandence-table">
                  <thead>
                    <tr>
                      <th>Course Outcomes</th>
                      {Array.from({ length: 14 }).map((_, index) =>
                        index + 1 <= 12 ? (
                          <th key={index}>PO-{index + 1}</th>
                        ) : (
                          <th key={index}>PSO-{index + 1 - 12}</th>
                        )
                      )}
                      {/* {poColumns.map((column, index) => (
                        <th key={column}>
                          {column}{" "}
                          {index >= 3 && (
                            <OverlayTrigger
                              placement="top"
                              overlay={<BsTooltip>Delete POs Column</BsTooltip>}
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
                                  onClick={() => removePoColumn(index)}
                                />
                              </Button>
                            </OverlayTrigger>
                          )}
                        </th>
                      ))} */}

                      {/* Add other table headers here */}
                    </tr>
                  </thead>
                  <tbody>
                    {programOutcomes.map((item: any, index: number) => (
                      <tr key={index}>
                        {/* {poColumns.map((column) => (
                            <td key={column}>
                            <SelectCell name={column} options={options} />
                            </td>
                          ))} */}
                        <td>{`${item.abbreviation}_${item.suffixValue}`}</td>
                        {Object.entries(programOutcomeDtos).map(
                          ([key, value]: any, index: number) =>
                            parseInt(key) === item.id &&
                            value.map((el: any) => (
                              <td key={`${el.name}${item.id}`}>
                                <Field
                                  as="select"
                                  name={`${el.name}_${item.id}_${el.id}`}
                                  className="form-select"
                                  onChange={handleChange}
                                >
                                  <option value="">Level</option>
                                  {[0, 1, 2, 3].map((optionValue) => (
                                    <option
                                      key={optionValue}
                                      value={optionValue}
                                      selected={optionValue === el.value}
                                    >
                                      {optionValue}
                                    </option>
                                  ))}
                                </Field>
                              </td>
                            ))
                        )}
                        {/* Add other table cells here */}
                      </tr>
                    ))}
                    {Object.keys(posAverage).length !== 0 && (
                      <tr>
                        <td>Average</td>
                        {Object.values(posAverage).map((el: any) => (
                          <td>{el !== "" ? el.toFixed(2) : "-"}</td>
                        ))}
                      </tr>
                    )}
                  </tbody>
                </Table>
                {programoutcomeApiStatus === "started" &&
                  programOutcomes.length === 0 && (
                    <TableSkeleton numberOfRows={5} numberOfColumns={4} />
                  )}
                {programoutcomeApiStatus === "finished" &&
                  programOutcomes.length === 0 && (
                    <Errordiv msg="No record found!" cstate className="mt-3" />
                  )}
                {/* <div className="my-3">
                  <Button
                    variant="primary"
                    type="button"
                    onClick={addPoColumn}
                    className="me-2"
                    size="sm"
                  >
                    <i className="fa-solid fa-plus"></i> Add PO's
                  </Button>
                </div> */}
              </div>

              <div className="modal-buttons">
                <CustomButton
                  type="submit"
                  variant="primary"
                  isSubmitting={isSubmittingSave}
                  disabled={programOutcomes.length === 0}
                  onClick={() => setButtonClicked("save")}
                  btnText={!isSubmittingSave ? "Save" : "Saving..."}
                />{" "}
                <CustomButton
                  type="submit"
                  variant="primary"
                  disabled={programOutcomes.length === 0}
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

export default MappingTable;

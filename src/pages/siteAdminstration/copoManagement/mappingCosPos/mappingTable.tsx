import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
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

const initialValues = {};

const MappingTable = ({ setActiveTab }: any) => {
  const [poColumns, setPoColumns] = useState(["PO1", "PO2", "PO3"]); // Initial PO columns
  const [reachMaxColumnMsg, setReachMaxColumnMsg] = useState({
    status: false,
    msg: "",
  });

  const options = [
    { value: "level0", label: "level 0" },
    { value: "level1", label: "level 1" },
    { value: "level2", label: "level 2" },
    { value: "level3", label: "level 3" },
    // Add more options as needed
  ];

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
          setActiveTab(4);
        }}
      >
        {({ isSubmitting, errors, touched, handleChange }) => (
          <Form>
            <div className="table-responsive admin-table-wrapper copo-table mt-3">
              <Table borderless striped>
                <thead>
                  <tr>
                    <th>Course Outcomes</th>
                    {poColumns.map((column, index) => (
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
                    ))}
                    <th>PSO1</th>
                    <th>PSO2</th>
                    {/* Add other table headers here */}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item) => (
                    <tr>
                      <td>{item.courseOutcomes}</td>
                      {poColumns.map((column) => (
                        <td key={column}>
                          <SelectCell name={column} options={options} />
                        </td>
                      ))}
                      <td>
                        <SelectCell name="name1" options={options} />
                      </td>
                      <td>
                        <SelectCell name="name1" options={options} />
                      </td>
                      {/* Add other table cells here */}
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="my-3">
                <Button
                  variant="primary"
                  type="button"
                  onClick={addPoColumn}
                  className="me-2"
                  size="sm"
                >
                  <i className="fa-solid fa-plus"></i> Add PO's
                </Button>
              </div>
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

export default MappingTable;

const tableData = [
  {
    courseOutcomes: "AIT_CO 1",
  },
  {
    courseOutcomes: "AIT_CO 2",
  },
  {
    courseOutcomes: "AIT_CO 3",
  },
];

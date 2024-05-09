import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useParams } from "react-router-dom";
import {
  Alert,
  AlertHeading,
  Button,
  ButtonGroup,
  Table,
} from "react-bootstrap";
import { postData } from "../../../../adapters/microservices";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import RouterLadyLoader from "../../../../globals/globalLazyLoader/routerLadyLoader";
import * as Yup from "yup";
import SelectCell from "../selectCell";

const initialValues = {};

const MappingTable = ({ setActiveTab }: any) => {
  const options = [
    { value: "level0", label: "level 0" },
    { value: "level1", label: "level 1" },
    { value: "level2", label: "level 2" },
    { value: "level3", label: "level 3" },
    // Add more options as needed
  ];

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, action) => {
          // console.log(values, action);
          setActiveTab(4)
        }}
      >
        {({ isSubmitting, errors, touched, handleChange }) => (
          <Form>
            <div className="table-responsive admin-table-wrapper copo-table mt-3">
              <Table borderless striped>
                <thead>
                  <tr>
                    <th>Course Outcomes</th>
                    <th>PO1</th>
                    <th>PO2</th>
                    <th>PO3</th>
                    <th>PO4</th>
                    <th>PO5</th>
                    <th>PO6</th>
                    <th>PO7</th>
                    <th>PO8</th>
                    <th>PO9</th>
                    <th>PO10</th>
                    <th>PO11</th>
                    <th>PO12</th>
                    <th>PSO1</th>
                    <th>PSO2</th>
                    {/* Add other table headers here */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td>
                      <SelectCell name="name1" options={options} />
                    </td>
                    <td>
                      <SelectCell name="name1" options={options} />
                    </td>
                    <td>
                      <SelectCell name="name1" options={options} />
                    </td>
                    <td>
                      <SelectCell name="name1" options={options} />
                    </td>
                    <td>
                      <SelectCell name="name1" options={options} />
                    </td>
                    <td>
                      <SelectCell name="name1" options={options} />
                    </td>
                    <td>
                      <SelectCell name="name1" options={options} />
                    </td>
                    <td>
                      <SelectCell name="name1" options={options} />
                    </td>
                    <td>
                      <SelectCell name="name1" options={options} />
                    </td>
                    <td>
                      <SelectCell name="name1" options={options} />
                    </td>
                    <td>
                      <SelectCell name="name1" options={options} />
                    </td>
                    <td>
                      <SelectCell name="name1" options={options} />
                    </td>
                    <td>
                      <SelectCell name="name1" options={options} />
                    </td>
                    <td>
                      <SelectCell name="name1" options={options} />
                    </td>
                    {/* Add other table cells here */}
                  </tr>
                </tbody>
              </Table>
            </div>

            <div className="modal-buttons">
              <CustomButton
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                btnText="Save & Continue"
              />
              {/* <CustomButton
                  type="reset"
                  btnText="Reset"
                  variant="outline-secondary"
                  disabled={isSubmitting}
                /> */}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default MappingTable;

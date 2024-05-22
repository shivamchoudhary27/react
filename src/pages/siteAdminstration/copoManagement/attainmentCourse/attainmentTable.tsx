import React, { useMemo } from "react";
import { useTable } from "react-table";
import SelectCell from "../selectCell";
import { Button, Form, Table } from "react-bootstrap";
import AssessmentButtons from "../assessmentCos/assessmentButtons";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import { Field, Formik } from "formik";
import TableSkeleton from "../../../../widgets/skeleton/table";
import Errordiv from "../../../../widgets/alert/errordiv";
import RouterLadyLoader from "../../../../globals/globalLazyLoader/routerLadyLoader";


type Props = {
  setActiveTab: any;
  courseAttainmentData: any
  courseAttainmentApiStatus: string
};

const AttainmentTable = (props: Props) => {
  return (
    <>
    {/* {
      props.courseAttainmentApiStatus !== "started" ? */}
      <Formik
        initialValues={{}}
        onSubmit={(values, action) => {
          // handleSubmit(values, action);
          props.setActiveTab(6)
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
                    <td><strong>Direct (D)</strong></td>
                    <td><strong>Indirect (I)</strong></td>
                    <td><strong>(0.8*D + 0.2*I)</strong></td>
                    <td></td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {
                    props.courseAttainmentData.map((item: any, index: number) => (
                      <tr>
                        <td>{`${item.abbreviation}_${item.suffixValue}`}</td>
                        <td>{item.averageAssessmentDirect}</td>
                        <td>
                            <Field
                              as="select"
                              name=""
                              className="form-select"
                            >
                              <option value="">Select</option>
                              <option value={1}>Feedback 1</option>
                              <option value={2}>Feedback 2</option>
                              <option value={3}>Feedback 3</option>
                            </Field>
                          </td>
                        <td>{item.averageAssessment}</td>
                        <td>4</td>
                        <td>{item.attainmentLevel}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
              {/* {props.courseAttainmentApiStatus === "started" &&
                  props.courseAttainmentData.length === 0 && (
                    <TableSkeleton numberOfRows={5} numberOfColumns={4} />
                  )}
                {props.courseAttainmentApiStatus === "finished" &&
                  props.courseAttainmentData.length === 0 && (
                    <Errordiv msg="No record found!" cstate className="mt-3" />
                  )} */}
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
      {/* :  <RouterLadyLoader status={true} /> */}
    {/* } */}
    </>
  );
};

export default AttainmentTable;
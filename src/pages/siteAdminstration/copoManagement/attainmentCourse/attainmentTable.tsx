import { Alert, Table } from "react-bootstrap";
import { Field, Formik, Form } from "formik";
import Errordiv from "../../../../widgets/alert/errordiv";
import { postData } from "../../../../adapters/microservices";
import TableSkeleton from "../../../../widgets/skeleton/table";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import RouterLadyLoader from "../../../../globals/globalLazyLoader/routerLadyLoader";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

type Props = {
  setActiveTab: any;
  initialValues: any;
  setInitialValue: any;
  courseAttainmentData: any;
  courseAttainmentApiStatus: string;
};

const AttainmentTable = (props: Props) => {
  const { cid } = useParams();
  const [apiCatchError, setApiCatchError] = useState({
    status: false,
    msg: "",
  });

  const handleSubmit = (values: any, action: any) => {
    const result: {
      id: number;
      abbreviation: any;
      suffixValue: any;
      feedbackIdNumber: any;
    }[] = [];
    const ids = [
      ...new Set(Object.keys(values).map((key) => key.split("_")[1])),
    ];

    ids.forEach((id) => {
      if (id) {
        result.push({
          id: Number(id),
          abbreviation: values[`abbreviation_${id}`],
          suffixValue: values[`suffixValue_${id}`],
          feedbackIdNumber: values[`feedbackIdNumber_${id}`],
        });
      }
    });

    postData(`/${cid}/attainment/mapping`, result)
      .then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          Swal.fire({
            timer: 3000,
            width: "25em",
            color: "#666",
            icon: "success",
            background: "#e7eef5",
            showConfirmButton: false,
            text: "Course outcome set successfully.",
          });
          setTimeout(() => {
            props.setActiveTab(6);
          }, 3000);
          setApiCatchError({
            status: false,
            msg: "",
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
        setApiCatchError({
          status: true,
          msg: err.message,
        });
      });
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
          initialValues={props.initialValues}
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
                        <tr>
                          <td>{`${item.abbreviation}_${item.suffixValue}`}</td>
                          <td>{item.averageAssessmentDirect}</td>
                          <td>
                            <Field
                              as="select"
                              name={`feedbackIdNumber_${item.id}`}
                              className="form-select"
                              onChange={(e: { target: { value: any } }) => {
                                handleChange(e);
                                props.setInitialValue((prevState: any) => ({
                                  ...prevState,
                                  [`feedbackIdNumber_${item.id}`]:
                                    e.target.value,
                                }));
                              }}
                            >
                              <option value={0}>Select</option>
                              <option value={1}>Feedback 1</option>
                              <option value={2}>Feedback 2</option>
                              <option value={3}>Feedback 3</option>
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

export default AttainmentTable;

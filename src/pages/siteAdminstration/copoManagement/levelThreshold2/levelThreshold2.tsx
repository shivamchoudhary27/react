import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import Errordiv from "../../../../widgets/alert/errordiv";
import { postData } from "../../../../adapters/microservices";
import TableSkeleton from "../../../../widgets/skeleton/table";
import { Alert, Table, Button, ButtonGroup } from "react-bootstrap";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import RouterLadyLoader from "../../../../globals/globalLazyLoader/routerLadyLoader";

const LevelThreshold2Table = ({
  levelData,
  setActiveTab,
  initialValues,
  setInitialValue,
  levelApiStatus,
  levelApiCatchError,
}: any) => {
  const { cid } = useParams();
  const [apiStatus, setApiStatus] = useState("");
  const [alertErrorMsg, setAlertErrorMsg] = useState({
    status: false,
    msg: "",
  });
  const [apiCatchError, setApiCatchError] = useState({
    status: false,
    msg: "",
  });

  const handleFormSubmit = (values: any, { setSubmitting }: any) => {
    const formattedData = Object.entries(initialValues)
      .reduce((acc, [key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          Object.values(value).every((v) => v !== null)
        ) {
          const value_id = key.split("_").pop();
          const keyVal = key.substring(0, key.lastIndexOf("_"));
          const index = acc.findIndex(
            (item: any) => item.id === parseInt(value_id)
          );
          if (index === -1) {
            acc.push({ id: parseInt(value_id), [keyVal]: value });
          } else {
            acc[index][`${keyVal}`] = value;
          }
        }
        return acc;
      }, [])
      .filter((obj) => {
        const { id, target, ...rest }: any = obj;
        return Object.keys(rest).length !== 0;
      });

    setApiStatus("started");
    setApiCatchError({ status: false, msg: "" });
    postData(`/${cid}/courseoutcome/level`, formattedData)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          setApiStatus("finished");
          setActiveTab(3);
          setApiCatchError({ status: false, msg: "" });
        }
        setSubmitting(false);
      })
      .catch((err: any) => {
        setApiStatus("finished");
        if (err.response.status === 500) {
          setApiCatchError({
            status: true,
            msg: `${err.message}: ${err.response.data.errorCode}`,
          });
        }
        // Handle error, maybe show an alert
      });
    setSubmitting(false);
  };

  return (
    <>
      {levelApiCatchError.status && (
        <Alert
          key="danger"
          variant="danger"
          onClose={() => setApiCatchError({ status: false, msg: "" })}
          dismissible
        >
          {levelApiCatchError.msg}
        </Alert>
      )}
      {alertErrorMsg.status && (
        <Alert
          key="danger"
          variant="danger"
          onClose={() => setAlertErrorMsg({ status: false, msg: "" })}
          dismissible
        >
          {alertErrorMsg.msg}
        </Alert>
      )}
      {apiStatus !== "started" ? (
        <Formik
          initialValues={initialValues}
          onSubmit={(values, action) => {
            handleFormSubmit(values, action);
          }}
        >
          {({ isSubmitting, errors, touched, handleChange }) => (
            <Form>
              <div className="table-responsive admin-table-wrapper copo-table mt-3">
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
                <Table borderless striped>
                  <thead>
                    <tr>
                      <th>Course Outcomes</th>
                      <th>Target Set (%)</th>
                      <th>Level 0 (Below)</th>
                      <th>Level 1 (Above & Below)</th>
                      <th>Level 2 (Between)</th>
                      <th>Level 3 (Above)</th>
                      {/* Add other table headers here */}
                    </tr>
                  </thead>
                  <tbody>
                    {levelData.map(
                      (
                        item: {
                          abbreviation: any;
                          suffixValue: any;
                          target:
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
                          id: any;
                        },
                        index: React.Key | null | undefined
                      ) => (
                        <tr key={index}>
                          <td>{`${item.abbreviation}_${item.suffixValue}`}</td>
                          <td>{item.target}</td>
                          <td>
                            {/* ================ level 0 button groups ================ */}
                            <ButtonGroup
                              aria-label="Basic"
                              size="sm"
                              className="minusplus-btngroup"
                            >
                              <Button
                                variant="primary"
                                onClick={() => {
                                  // set decrement value for 0 level field === >>>
                                  initialValues[`level_0_Target_${item.id}`] >
                                    0 &&
                                    setInitialValue((prevState: any) => ({
                                      ...prevState,
                                      [`level_0_Target_${item.id}`]: parseInt(
                                        initialValues[
                                          `level_0_Target_${item.id}`
                                        ] - 1
                                      ),
                                    }));

                                  // set decrement value for 0 level parallel field level 1 min === >>>
                                  initialValues[
                                    `level_1_min_Target_${item.id}`
                                  ] > 0 &&
                                    setInitialValue((prevState: any) => ({
                                      ...prevState,
                                      [`level_1_min_Target_${item.id}`]:
                                        parseInt(
                                          initialValues[
                                            `level_1_min_Target_${item.id}`
                                          ] - 1
                                        ),
                                    }));

                                  // set alert message on min decrement === >>>
                                  initialValues[`level_0_Target_${item.id}`] <=
                                  0
                                    ? // alert(
                                      //   "level 0 min value must be greater than or equal to 0"
                                      // );
                                      setAlertErrorMsg({
                                        status: true,
                                        msg: "Level 0 below value must be greater than or equal to 0",
                                      })
                                    : setAlertErrorMsg({
                                        status: false,
                                        msg: "",
                                      });
                                }}
                              >
                                <i className="fa-solid fa-minus"></i>
                              </Button>
                              <Field
                                min={0}
                                max={
                                  initialValues[
                                    `level_1_max_Target_${item.id}`
                                  ] - 1
                                }
                                type="number"
                                placeholder={0}
                                name={`level_0_Target_${item.id}`}
                                onChange={(e: { target: { value: any } }) => {
                                  handleChange(e);
                                  setInitialValue((prevState: any) => ({
                                    ...prevState,
                                    [`level_0_Target_${item.id}`]: parseInt(
                                      e.target.value
                                    ),
                                  }));

                                  setInitialValue((prevState: any) => ({
                                    ...prevState,
                                    [`level_1_min_Target_${item.id}`]: parseInt(
                                      e.target.value
                                    ),
                                  }));
                                }}
                                value={
                                  initialValues[`level_0_Target_${item.id}`]
                                }
                              />

                              <Button variant="primary">
                                <i
                                  className="fa-solid fa-plus"
                                  onClick={() => {
                                    // set increment value for 0 level field === >>>
                                    initialValues[`level_0_Target_${item.id}`] <
                                      initialValues[
                                        `level_1_max_Target_${item.id}`
                                      ] -
                                        1 &&
                                      setInitialValue((prevState: any) => ({
                                        ...prevState,
                                        [`level_0_Target_${item.id}`]: parseInt(
                                          initialValues[
                                            `level_0_Target_${item.id}`
                                          ] + 1
                                        ),
                                      }));

                                    // set increment value for 0 level parallel field level 1 min === >>>
                                    initialValues[
                                      `level_1_min_Target_${item.id}`
                                    ] <
                                      initialValues[
                                        `level_1_max_Target_${item.id}`
                                      ] -
                                        1 &&
                                      setInitialValue((prevState: any) => ({
                                        ...prevState,
                                        [`level_1_min_Target_${item.id}`]:
                                          parseInt(
                                            initialValues[
                                              `level_1_min_Target_${item.id}`
                                            ] + 1
                                          ),
                                      }));

                                    // set alert message on max increment === >>>
                                    initialValues[
                                      `level_0_Target_${item.id}`
                                    ] >=
                                    initialValues[
                                      `level_1_max_Target_${item.id}`
                                    ] -
                                      1
                                      ? // alert(
                                        //   "Level 0 value must be less than Level 1 max value"
                                        // );
                                        setAlertErrorMsg({
                                          status: true,
                                          msg: "Level 0 above value must be less than Level 1 below value",
                                        })
                                      : setAlertErrorMsg({
                                          status: false,
                                          msg: "",
                                        });
                                  }}
                                ></i>
                              </Button>
                            </ButtonGroup>
                            <FieldErrorMessage
                              errors={errors[`level_0_Target_${item.id}`]}
                              touched={touched[`level_0_Target_${item.id}`]}
                            />
                            {/* ================ level 0 button groups end ================ */}
                          </td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              {/* ================ level 1 button groups (above) ================ */}
                              <ButtonGroup
                                aria-label="Basic"
                                size="sm"
                                className="minusplus-btngroup"
                              >
                                <Button
                                  variant="primary"
                                  onClick={() => {
                                    // set decrement value for 1 level max field === >>>
                                    initialValues[
                                      `level_1_max_Target_${item.id}`
                                    ] >
                                      initialValues[
                                        `level_0_Target_${item.id}`
                                      ] +
                                        1 &&
                                      setInitialValue((prevState: any) => ({
                                        ...prevState,
                                        [`level_1_max_Target_${item.id}`]:
                                          parseInt(
                                            initialValues[
                                              `level_1_max_Target_${item.id}`
                                            ] - 1
                                          ),
                                      }));

                                    // set decrement value for 1 level max parallel field level 2 min === >>>
                                    initialValues[
                                      `level_2_min_target_${item.id}`
                                    ] >
                                      initialValues[
                                        `level_0_Target_${item.id}`
                                      ] +
                                        1 &&
                                      setInitialValue((prevState: any) => ({
                                        ...prevState,
                                        [`level_2_min_target_${item.id}`]:
                                          parseInt(
                                            initialValues[
                                              `level_2_min_target_${item.id}`
                                            ] - 1
                                          ),
                                      }));

                                    // set alert on min decrement === >>>
                                    initialValues[
                                      `level_1_max_Target_${item.id}`
                                    ] <=
                                    initialValues[`level_0_Target_${item.id}`] +
                                      1
                                      ? // alert(
                                        //   "Level 1 max value must be greater than level 0 value"
                                        // );
                                        setAlertErrorMsg({
                                          status: true,
                                          msg: "Level 1 below value must be greater than level 0 above value",
                                        })
                                      : setAlertErrorMsg({
                                          status: false,
                                          msg: "",
                                        });
                                  }}
                                >
                                  <i className="fa-solid fa-minus"></i>
                                </Button>
                                <Field
                                  min={
                                    initialValues[
                                      `level_1_min_Target_${item.id}`
                                    ] + 1
                                  }
                                  max={
                                    initialValues[
                                      `level_2_max_target_${item.id}`
                                    ] - 1
                                  }
                                  type="number"
                                  name={`level_1_max_Target_${item.id}`}
                                  placeholder={0}
                                  onChange={(e: { target: { value: any } }) => {
                                    handleChange(e);
                                    setInitialValue((prevState: any) => ({
                                      ...prevState,
                                      [`level_1_max_Target_${item.id}`]:
                                        parseInt(e.target.value),
                                    }));

                                    setInitialValue((prevState: any) => ({
                                      ...prevState,
                                      [`level_2_min_target_${item.id}`]:
                                        parseInt(e.target.value),
                                    }));
                                  }}
                                  value={
                                    initialValues[
                                      `level_1_max_Target_${item.id}`
                                    ]
                                  }
                                />
                                <Button
                                  variant="primary"
                                  onClick={() => {
                                    // set increment value for 1 level max field === >>>
                                    initialValues[
                                      `level_1_max_Target_${item.id}`
                                    ] <
                                      initialValues[
                                        `level_2_max_target_${item.id}`
                                      ] -
                                        1 &&
                                      setInitialValue((prevState: any) => ({
                                        ...prevState,
                                        [`level_1_max_Target_${item.id}`]:
                                          parseInt(
                                            initialValues[
                                              `level_1_max_Target_${item.id}`
                                            ] + 1
                                          ),
                                      }));

                                    // set increment value for 1 level max parallel field level 2 max === >>>
                                    initialValues[
                                      `level_2_min_target_${item.id}`
                                    ] <
                                      initialValues[
                                        `level_2_max_target_${item.id}`
                                      ] -
                                        1 &&
                                      setInitialValue((prevState: any) => ({
                                        ...prevState,
                                        [`level_2_min_target_${item.id}`]:
                                          parseInt(
                                            initialValues[
                                              `level_2_min_target_${item.id}`
                                            ] + 1
                                          ),
                                      }));

                                    // set alert message on max increment === >>
                                    initialValues[
                                      `level_1_max_Target_${item.id}`
                                    ] >=
                                    initialValues[
                                      `level_2_max_target_${item.id}`
                                    ] -
                                      1
                                      ? // alert(
                                        //   "Level 1 max value must be less than level 2 max value"
                                        // );
                                        setAlertErrorMsg({
                                          status: true,
                                          msg: "Level 1 above value must be less than level 2 below value",
                                        })
                                      : setAlertErrorMsg({
                                          status: false,
                                          msg: "",
                                        });
                                  }}
                                >
                                  <i className="fa-solid fa-plus"></i>
                                </Button>
                              </ButtonGroup>
                              {/* ================ level 1 button groups end ================ */}

                              {/* ================ level 1 button groups (below) ================ */}
                              {/* <ButtonGroup
                                aria-label="Basic"
                                size="sm"
                                className="minusplus-btngroup"
                              > */}
                              {/* <Button variant="primary" disabled>
                                  <i className="fa-solid fa-minus"></i>
                                </Button> */}
                              <Field
                                disabled
                                className="form-control copo-input"
                                type="number"
                                name={`level_1_min_Target_${item.id}`}
                                placeholder={0}
                                onChange={(e: { target: { value: any } }) => {
                                  handleChange(e);
                                  setInitialValue((prevState: any) => ({
                                    ...prevState,
                                    [`level_1_min_Target_${item.id}`]: parseInt(
                                      e.target.value
                                    ),
                                  }));
                                }}
                                value={
                                  initialValues[`level_1_min_Target_${item.id}`]
                                }
                              />
                              {/* <Button variant="primary" disabled>
                                  <i className="fa-solid fa-plus"></i>
                                </Button> */}
                              {/* </ButtonGroup> */}
                              {/* ================ level 1 button groups end ================ */}
                            </div>
                          </td>
                          <td>
                          <div className="d-flex align-items-center gap-2">
                              {/* ================ level 2 button groups (below) ================ */}
                              {/* <ButtonGroup
                                aria-label="Basic"
                                size="sm"
                                className="minusplus-btngroup"
                              > */}
                              {/* <Button variant="primary" disabled>
                                  <i className="fa-solid fa-minus"></i>
                                </Button> */}
                              <Field
                                disabled
                                className="form-control copo-input"
                                type="number"
                                name={`level_2_min_target_${item.id}`}
                                placeholder={0}
                                onChange={(e: { target: { value: any } }) => {
                                  handleChange(e);
                                  setInitialValue((prevState: any) => ({
                                    ...prevState,
                                    [`level_2_min_target_${item.id}`]: parseInt(
                                      e.target.value
                                    ),
                                  }));
                                }}
                                value={
                                  initialValues[`level_2_min_target_${item.id}`]
                                }
                              />
                              {/* <Button variant="primary" disabled>
                                  <i className="fa-solid fa-plus"></i>
                                </Button> */}
                              {/* </ButtonGroup> */}
                              {/* ================ level 2 button groups end ================ */}

                              {/* ================ level 2 button groups (above) ================ */}
                              <ButtonGroup
                                aria-label="Basic"
                                size="sm"
                                className="minusplus-btngroup"
                              >
                                <Button
                                  variant="primary"
                                  onClick={() => {
                                    // set decrement value for 2 level max field === >>>
                                    initialValues[
                                      `level_2_max_target_${item.id}`
                                    ] >
                                      initialValues[
                                        `level_1_max_Target_${item.id}`
                                      ] +
                                        1 &&
                                      setInitialValue((prevState: any) => ({
                                        ...prevState,
                                        [`level_2_max_target_${item.id}`]:
                                          parseInt(
                                            initialValues[
                                              `level_2_max_target_${item.id}`
                                            ] - 1
                                          ),
                                      }));

                                    // set decrement value for 2 level max parallel field level 3 === >>>
                                    initialValues[`level_3_target_${item.id}`] >
                                      initialValues[
                                        `level_1_max_Target_${item.id}`
                                      ] +
                                        1 &&
                                      setInitialValue((prevState: any) => ({
                                        ...prevState,
                                        [`level_3_target_${item.id}`]: parseInt(
                                          initialValues[
                                            `level_3_target_${item.id}`
                                          ] - 1
                                        ),
                                      }));

                                    // set alert message on min decrement === >>>
                                    initialValues[
                                      `level_2_max_target_${item.id}`
                                    ] <=
                                    initialValues[
                                      `level_1_max_Target_${item.id}`
                                    ] +
                                      1
                                      ? // alert(
                                        //   "level 2 max value must be greater than level 1 min value"
                                        // );
                                        setAlertErrorMsg({
                                          status: true,
                                          msg: "Level 2 below value must be greater than level 1 above value",
                                        })
                                      : setAlertErrorMsg({
                                          status: false,
                                          msg: "",
                                        });
                                  }}
                                >
                                  <i className="fa-solid fa-minus"></i>
                                </Button>
                                <Field
                                  min={
                                    initialValues[
                                      `level_1_max_Target_${item.id}`
                                    ] + 1
                                  }
                                  max={100}
                                  type="number"
                                  name={`level_2_max_target_${item.id}`}
                                  placeholder={0}
                                  onChange={(e: { target: { value: any } }) => {
                                    handleChange(e);
                                    setInitialValue((prevState: any) => ({
                                      ...prevState,
                                      [`level_2_max_target_${item.id}`]:
                                        parseInt(e.target.value),
                                    }));

                                    setInitialValue((prevState: any) => ({
                                      ...prevState,
                                      [`level_3_target_${item.id}`]: parseInt(
                                        e.target.value
                                      ),
                                    }));
                                  }}
                                  value={
                                    initialValues[
                                      `level_2_max_target_${item.id}`
                                    ]
                                  }
                                />
                                <Button
                                  variant="primary"
                                  onClick={() => {
                                    // set increment value for 2 level max field === >>>
                                    initialValues[
                                      `level_2_max_target_${item.id}`
                                    ] < 100 &&
                                      setInitialValue((prevState: any) => ({
                                        ...prevState,
                                        [`level_2_max_target_${item.id}`]:
                                          parseInt(
                                            initialValues[
                                              `level_2_max_target_${item.id}`
                                            ] + 1
                                          ),
                                      }));

                                    // set increment value for 2 level max parallel field level 3 === >>>
                                    initialValues[`level_3_target_${item.id}`] <
                                      100 &&
                                      setInitialValue((prevState: any) => ({
                                        ...prevState,
                                        [`level_3_target_${item.id}`]: parseInt(
                                          initialValues[
                                            `level_3_target_${item.id}`
                                          ] + 1
                                        ),
                                      }));

                                    // set alert message on max increment === >>
                                    initialValues[
                                      `level_2_max_target_${item.id}`
                                    ] >= 100
                                      ? // alert(
                                        //   "Level 2 & level 3 max value is less than or equal to 100"
                                        // );
                                        setAlertErrorMsg({
                                          status: true,
                                          msg: "Level 2 above value must be less than or equal to 100",
                                        })
                                      : setAlertErrorMsg({
                                          status: false,
                                          msg: "",
                                        });
                                  }}
                                >
                                  <i className="fa-solid fa-plus"></i>
                                </Button>
                              </ButtonGroup>
                              {/* ================ level 2 button groups end ================ */}
                            </div>
                          </td>
                          <td>
                            {/* ================ level 3 button groups ================ */}
                            {/* <ButtonGroup
                              aria-label="Basic"
                              size="sm"
                              className="minusplus-btngroup"
                            > */}
                            {/* <Button disabled variant="primary">
                                <i className="fa-solid fa-minus"></i>
                              </Button> */}
                            <Field
                              disabled
                              className="form-control copo-input"
                              type="number"
                              name={`level_3_target_${item.id}`}
                              placeholder={0}
                              onChange={(e: { target: { value: any } }) => {
                                handleChange(e);
                                setInitialValue((prevState: any) => ({
                                  ...prevState,
                                  [`level_3_target_${item.id}`]: parseInt(
                                    e.target.value
                                  ),
                                }));
                              }}
                              value={initialValues[`level_3_target_${item.id}`]}
                            />
                            {/* <Button variant="primary" disabled>
                                <i className="fa-solid fa-plus"></i>
                              </Button> */}
                            {/* </ButtonGroup> */}
                            {/* ================ level 3 button groups end ================ */}
                          </td>
                          {/* Add other table cells here */}
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
                {levelApiStatus === "started" && levelData.length === 0 && (
                  <TableSkeleton numberOfRows={5} numberOfColumns={4} />
                )}
                {levelApiStatus === "finished" && levelData.length === 0 && (
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

export default LevelThreshold2Table;
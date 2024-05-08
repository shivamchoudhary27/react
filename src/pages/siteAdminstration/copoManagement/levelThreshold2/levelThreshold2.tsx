import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useParams } from "react-router-dom";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { postData } from "../../../../adapters/microservices";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";

const LevelThreshold2Table = ({
  levelData,
  setActiveTab,
  initialValues,
  setInitialValue,
}: any) => {
  const { id } = useParams();

  const handleFormSubmit = (values: any, { setSubmitting }: any) => {
    const formattedData = Object.entries(initialValues).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) {
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
      },
      []
    );

    // if (Object.keys(values).length !== 0) {
    postData(`/${id}/courseoutcome/level`, formattedData)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          setActiveTab(3);
          // console.log(result);
        }
        setSubmitting(false);
      })
      .catch((err: any) => {
        console.log(err);
        // Handle error, maybe show an alert
      });
    // }

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, action) => {
        handleFormSubmit(values, action);
      }}
    >
      {({ isSubmitting, errors, touched, handleChange }) => (
        <Form>
          <div className="table-responsive admin-table-wrapper copo-table mt-3">
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
                {levelData.map((item: { abbreviation: any; suffixValue: any; target: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; id: any; }, index: React.Key | null | undefined) => (
                  <tr key={index}>
                    <td>{`${item.abbreviation}_${item.suffixValue}`}</td>
                    <td>{item.target}</td>
                    <td>
                      <ButtonGroup
                        aria-label="Basic"
                        size="sm"
                        className="minusplus-btngroup"
                      >
                        <Button
                          variant="primary"
                          onClick={() =>
                            {
                              initialValues[`level_0_Target_${item.id}`] > 0 ?
                              setInitialValue((prevState: any) => ({
                                ...prevState,
                                [`level_0_Target_${item.id}`]: parseInt(
                                  initialValues[`level_0_Target_${item.id}`] - 1
                                ),
                              })) : setErrorMsg({ status: true, message: "error occur" })

                              initialValues[`level_1_min_Target_${item.id}`] > 0 &&
                              setInitialValue((prevState: any) => ({
                                ...prevState,
                                [`level_1_min_Target_${item.id}`]: parseInt(
                                  initialValues[`level_1_min_Target_${item.id}`] - 1
                                ),
                              }));
                            }
                          }
                        >
                          <i className="fa-solid fa-minus"></i>
                        </Button>
                        <Field
                          min={0}
                          max={initialValues[`level_1_max_Target_${item.id}`] - 1}
                          type="number"
                          placeholder={`level_0_Target_${item.id}`}
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
                          value={initialValues[`level_0_Target_${item.id}`]}
                        />

                        <Button variant="primary">
                          <i
                            className="fa-solid fa-plus"
                            onClick={() => 
                              {
                                initialValues[`level_0_Target_${item.id}`] < initialValues[`level_1_max_Target_${item.id}`] -1 && 
                                setInitialValue((prevState: any) => ({
                                  ...prevState,
                                  [`level_0_Target_${item.id}`]: parseInt(
                                    initialValues[`level_0_Target_${item.id}`] + 1
                                  ),
                                }));
  
                                initialValues[`level_1_min_Target_${item.id}`] < initialValues[`level_1_max_Target_${item.id}`]-1 &&
                                setInitialValue((prevState: any) => ({
                                  ...prevState,
                                  [`level_1_min_Target_${item.id}`]: parseInt(
                                    initialValues[`level_1_min_Target_${item.id}`] + 1
                                  ),
                                }));
                              }
                          }
                          ></i>
                        </Button>
                      </ButtonGroup>


                      <FieldErrorMessage
                        errors={errors[`level_0_Target_${item.id}`]}
                        touched={touched[`level_0_Target_${item.id}`]}
                      />
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ButtonGroup
                          aria-label="Basic"
                          size="sm"
                          className="minusplus-btngroup"
                        >
                          <Button
                            variant="primary"
                            onClick={() => 
                              {
                                initialValues[`level_1_max_Target_${item.id}`] > initialValues[`level_0_Target_${item.id}`]+1 &&
                                setInitialValue((prevState: any) => ({
                                  ...prevState,
                                  [`level_1_max_Target_${item.id}`]: parseInt(
                                    initialValues[`level_1_max_Target_${item.id}`] - 1
                                  ),
                                }));
  
                                initialValues[`level_2_min_target_${item.id}`] > initialValues[`level_0_Target_${item.id}`]+1 &&
                                setInitialValue((prevState: any) => ({
                                  ...prevState,
                                  [`level_2_min_target_${item.id}`]: parseInt(
                                    initialValues[`level_2_min_target_${item.id}`] - 1
                                  ),
                                }));
                              }
                          }
                          >
                            <i className="fa-solid fa-minus"></i>
                          </Button>
                          <Field
                            min={initialValues[`level_1_min_Target_${item.id}`] + 1}
                            max={initialValues[`level_2_max_target_${item.id}`] - 1}
                            type="number"
                            name={`level_1_max_Target_${item.id}`}
                            placeholder={`level_1_max_Target_${item.id}`}
                            onChange={(e: { target: { value: any } }) => {
                              handleChange(e);
                              setInitialValue((prevState: any) => ({
                                ...prevState,
                                [`level_1_max_Target_${item.id}`]: parseInt(
                                  e.target.value
                                ),
                              }));

                              setInitialValue((prevState: any) => ({
                                ...prevState,
                                [`level_2_min_target_${item.id}`]: parseInt(
                                  e.target.value
                                ),
                              }));
                            }}
                            value={
                              initialValues[`level_1_max_Target_${item.id}`]
                            }
                          />
                          <Button variant="primary"
                            onClick={() => 
                              {
                                initialValues[`level_1_max_Target_${item.id}`] < initialValues[`level_2_max_target_${item.id}`] -1 && 
                                setInitialValue((prevState: any) => ({
                                  ...prevState,
                                  [`level_1_max_Target_${item.id}`]: parseInt(
                                    initialValues[`level_1_max_Target_${item.id}`] + 1
                                  ),
                                }));
  
                                initialValues[`level_2_min_target_${item.id}`] < initialValues[`level_2_max_target_${item.id}`]-1 &&
                                setInitialValue((prevState: any) => ({
                                  ...prevState,
                                  [`level_2_min_target_${item.id}`]: parseInt(
                                    initialValues[`level_2_min_target_${item.id}`] + 1
                                  ),
                                }));
                              }
                          }
                          >
                            <i className="fa-solid fa-plus"></i>
                          </Button>
                        </ButtonGroup>
                        <FieldErrorMessage
                          errors={errors[`level_1_max_Target_${item.id}`]}
                          touched={touched[`level_1_max_Target_${item.id}`]}
                        />

                        <ButtonGroup
                          aria-label="Basic"
                          size="sm"
                          className="minusplus-btngroup"
                        >
                          <Button
                            variant="primary"
                            disabled
                          >
                            <i className="fa-solid fa-minus"></i>
                          </Button>
                          <Field
                            disabled
                            type="number"
                            name={`level_1_min_Target_${item.id}`}
                            placeholder={`level_1_min_Target_${item.id}`}
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
                          <Button variant="primary" disabled>
                            <i className="fa-solid fa-plus"></i>
                          </Button>
                        </ButtonGroup>
                        <FieldErrorMessage
                          errors={errors[`level_1_min_Target_${item.id}`]}
                          touched={touched[`level_1_min_Target_${item.id}`]}
                        />
                      </div>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ButtonGroup
                          aria-label="Basic"
                          size="sm"
                          className="minusplus-btngroup"
                        >
                          <Button
                            variant="primary"
                            disabled
                          >
                            <i className="fa-solid fa-minus"></i>
                          </Button>
                          <Field
                          disabled
                            type="number"
                            name={`level_2_min_target_${item.id}`}
                            placeholder={`level_2_min_target_${item.id}`}
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
                          <Button variant="primary" disabled>
                            <i className="fa-solid fa-plus"></i>
                          </Button>
                        </ButtonGroup>
                        <FieldErrorMessage
                          errors={errors[`level_2_min_target_${item.id}`]}
                          touched={touched[`level_2_min_target_${item.id}`]}
                        />

                        <ButtonGroup
                          aria-label="Basic"
                          size="sm"
                          className="minusplus-btngroup"
                        >
                          <Button
                            variant="primary"
                            onClick={() => 
                              {
                                initialValues[`level_2_max_target_${item.id}`] > initialValues[`level_1_max_Target_${item.id}`]+1 &&
                                setInitialValue((prevState: any) => ({
                                  ...prevState,
                                  [`level_2_max_target_${item.id}`]: parseInt(
                                    initialValues[`level_2_max_target_${item.id}`] - 1
                                  ),
                                }));
  
                                initialValues[`level_3_target_${item.id}`] > initialValues[`level_1_max_Target_${item.id}`]+1 &&
                                setInitialValue((prevState: any) => ({
                                  ...prevState,
                                  [`level_3_target_${item.id}`]: parseInt(
                                    initialValues[`level_3_target_${item.id}`] - 1
                                  ),
                                }));
                              }
                          }
                          >
                            <i className="fa-solid fa-minus"></i>
                          </Button>
                          <Field
                            min={initialValues[`level_1_max_Target_${item.id}`] + 1}
                            max={100}
                            type="number"
                            name={`level_2_max_target_${item.id}`}
                            placeholder={`level_2_max_target_${item.id}`}
                            onChange={(e: { target: { value: any } }) => {
                              handleChange(e);
                              setInitialValue((prevState: any) => ({
                                ...prevState,
                                [`level_2_max_target_${item.id}`]: parseInt(
                                  e.target.value
                                ),
                              }));

                              setInitialValue((prevState: any) => ({
                                ...prevState,
                                [`level_3_target_${item.id}`]: parseInt(
                                  e.target.value
                                ),
                              }));
                            }}
                            value={
                              initialValues[`level_2_max_target_${item.id}`]
                            }
                          />
                          <Button variant="primary"
                            onClick={() => 
                              {
                                initialValues[`level_2_max_target_${item.id}`] < 100 &&
                                setInitialValue((prevState: any) => ({
                                  ...prevState,
                                  [`level_2_max_target_${item.id}`]: parseInt(
                                    initialValues[`level_2_max_target_${item.id}`] + 1
                                  ),
                                }));
  
                                initialValues[`level_3_target_${item.id}`] < 100 &&
                                setInitialValue((prevState: any) => ({
                                  ...prevState,
                                  [`level_3_target_${item.id}`]: parseInt(
                                    initialValues[`level_3_target_${item.id}`] + 1
                                  ),
                                }));
                              }
                          }
                          >
                            <i className="fa-solid fa-plus"></i>
                          </Button>
                        </ButtonGroup>
                        <FieldErrorMessage
                          errors={errors[`level_2_max_target_${item.id}`]}
                          touched={touched[`level_2_max_target_${item.id}`]}
                        />
                      </div>
                    </td>
                    <td>
                      <ButtonGroup
                        aria-label="Basic"
                        size="sm"
                        className="minusplus-btngroup"
                      >
                        <Button
                          disabled
                          variant="primary"
                        >
                          <i className="fa-solid fa-minus"></i>
                        </Button>
                        <Field
                        disabled
                          type="number"
                          name={`level_3_target_${item.id}`}
                          placeholder={`level_3_target_${item.id}`}
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
                        <Button variant="primary" disabled>
                          <i className="fa-solid fa-plus"></i>
                        </Button>
                      </ButtonGroup>
                      <FieldErrorMessage
                        errors={errors[`level_3_target_${item.id}`]}
                        touched={touched[`level_3_target_${item.id}`]}
                      />
                    </td>
                    {/* Add other table cells here */}
                  </tr>
                ))}
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
  );
};

export default LevelThreshold2Table;

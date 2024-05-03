// import React, { useMemo } from "react";
// import { useTable } from "react-table";
// import { Table } from "react-bootstrap";
// import CustomButton from "../../../../widgets/formInputFields/buttons";
// import CounterCell from "../counterCell";

// type Props = {
//   levelData: any;
//   handleSubmit: any;
//   handleChange: any;
//   setFieldValue: any;
//   values: any
// };

// const LevelThreshold2Table = (props: Props) => {
//   const tableColumn = [
//     {
//       Header: "Course Outcomes",
//       Cell: ({ row }: any) => (
//         <span>{`${row.original.abbreviation}_${row.original.suffixValue}`}</span>
//       ),
//     },
//     {
//       Header: "Target Set(%)",
//       accessor: "target",
//     },
//     {
//       Header: "Level 0 (Below)",
//       // accessor: "value",
//       Cell: ({ row }: any) => (
//         <CounterCell
//           name={`level_0_Target_${row.original.id}`}
//           rowValue={row.original.level_0_Target}
//           values={props.values}
//         />
//       ),
//     },
//     {
//       Header: "Level 1 (Below and Above)",
//       // accessor: "value",
//       Cell: ({ row }: any) => (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "start",
//             alignItems: "center",
//           }}
//         >
//           <CounterCell
//             rowValue={row.original.level_1_min_Target}
//             disableStatus={true}
//             name={`level_1_min_Target_${row.original.id}`} values={props.values} />
//           <CounterCell
//             rowValue={row.original.level_1_max_Target}
//             name={`level_1_max_Target_${row.original.id}`}
//             values={props.values}
//           />
//         </div>
//       ),
//     },
//     {
//       Header: "Level 2 (Between)",
//       // accessor: "value",
//       Cell: ({ row }: any) => (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "start",
//             alignItems: "center",
//           }}
//         >
//           <CounterCell
//             rowValue={row.original.level_2_min_target}
//             disableStatus={true}
//             name={`level_2_min_target_${row.original.id}`}
//             values={props.values}
//           />
//           <CounterCell
//             rowValue={row.original.level_2_max_target}
//             name={`level_2_max_target_${row.original.id}`}
//             values={props.values}
//           />
//         </div>
//       ),
//     },
//     {
//       Header: "Level 3 (Above)",
//       // accessor: "value",
//       Cell: ({ row }: any) => (
//         <CounterCell
//           rowValue={row.original.level_3_target}
//           name={`level_3_target_${row.original.id}`}
//           values={props.values}
//         />
//       ),
//     },
//   ];

//   // react table custom variable decleration === >>>
//   const columns = useMemo(() => tableColumn, []);
//   const data = useMemo(() => props.levelData, [props.levelData]);
//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({
//       columns,
//       data,
//     });
//   let count = 1;

//   const counterHandler = (val: any) => {
//     console.log(val);
//   };

//   const handleIncrement = () => {
//     // console.log(setFieldValue)
//     // count = count + 1;
//     // setFieldValue(name, count);
//     // setTargetData((preVal) => ({
//     //   ...preVal,
//     //   [`target_${id}`]: count,
//     // }));
//   };

//   const handleDecrement = () => {
//     console.log("---");
//     // count = count - 1;
//     // setFieldValue(`target_${id}`, count);
//     // setTargetData((preVal) => ({
//     //   ...preVal,
//     //   [`target_${id}`]: count,
//     // }));
//   };

//   return (
//     <React.Fragment>
//       <div className="table-responsive admin-table-wrapper copo-table mt-3">
//         <Table borderless striped {...getTableProps}>
//           <thead>
//             {headerGroups.map((headerGroup, index) => (
//               <tr {...headerGroup.getHeaderGroupProps()} key={index}>
//                 {headerGroup.headers.map((column, index) => (
//                   <th {...column.getHeaderProps()} key={index}>
//                     {column.render("Header")}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>

//           <tbody {...getTableBodyProps}>
//             {rows.map((row, index) => {
//               prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()} key={index}>
//                   {row.cells.map((cell, index) => (
//                     <td {...cell.getCellProps()} key={index}>
//                       {cell.render("Cell")}
//                     </td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </Table>
//         {/* {apiStatus === "started" && departmentData.length === 0 && (
//           <TableSkeleton numberOfRows={5} numberOfColumns={4} />
//         )}
//         {apiStatus === "finished" && departmentData.length === 0 && (
//           <Errordiv msg="No record found!" cstate className="mt-3" />
//         )} */}
//       </div>

//       <div className="modal-buttons">
//         <CustomButton
//           type="submit"
//           variant="primary"
//           // isSubmitting={isSubmitting}
//           btnText="Save & Continue"
//         />{" "}
//         <CustomButton
//           type="reset"
//           btnText="Reset"
//           variant="outline-secondary"
//         />
//       </div>
//     </React.Fragment>
//   );
// };

// export default LevelThreshold2Table;

// const tableData = [
//   {
//     courseOutcomes: "AIT_CO 1",
//     targetSet: 60,
//   },
//   {
//     courseOutcomes: "AIT_CO 2",
//     targetSet: 60,
//   },
//   {
//     courseOutcomes: "AIT_CO 3",
//     targetSet: 60,
//   },
// ];

import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import CounterCell from "../counterCell";
import { postData } from "../../../../adapters/microservices";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";

const generateValidationSchema = (levelData: any[]) => {
  let validationSchema = Yup.object().shape({});

  // Iterate over levelData to generate validation rules for each field
  levelData.forEach((item) => {
    // Example: Add validation rule for level_0_Target_${item.id}
    validationSchema = validationSchema.shape({
      // [`level_0_Target_${item.id}`]: Yup.number().required(
      //   "This field is required"
      // ),
      // [`level_1_max_Target_${item.id}`]: Yup.number().required(
      //   "This field is required"
      // ),
      // [`level_1_min_Target_${item.id}`]: Yup.number().required(
      //   "This field is required"
      // ),
      // [`level_2_min_target_${item.id}`]: Yup.number().required(
      //   "This field is required"
      // ),
      // [`level_2_max_target_${item.id}`]: Yup.number().required(
      //   "This field is required"
      // ),
      // [`level_3_target_${item.id}`]: Yup.number().required(
      //   "This field is required"
      // ),
      // Add validation rules for other fields dynamically
    });
  });

  return validationSchema;
};

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
        if (result.data !== "" && result.status === 201) {
          // setActiveTab(2);
          console.log(result);
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

  const incrementValue = () => {};

  const decrementValue = () => {};

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={generateValidationSchema(levelData)}
      onSubmit={(values, action) => {
        handleFormSubmit(values, action);
      }}
    >
      {({ isSubmitting, errors, touched, handleChange, setFieldValue }) => (
        <Form>
          <div className="table-responsive admin-table-wrapper copo-table mt-3">
            <Table borderless striped>
              <thead>
                <tr>
                  <th>Course Outcomes</th>
                  <th>Target Set (%)</th>
                  <th>Level 0 (Below)</th>
                  <th>Level 1 (Below & Above)</th>
                  <th>Level 2 (Between)</th>
                  <th>Level 3 (Above)</th>
                  {/* Add other table headers here */}
                </tr>
              </thead>
              <tbody>
                {levelData.map((item, index) => (
                  <tr key={index}>
                    <td>{`${item.abbreviation}_${item.suffixValue}`}</td>
                    <td>{item.target}</td>
                    <td>
                      <ButtonGroup
                        aria-label="Basic"
                        size="sm"
                        className="minusplus-btngroup"
                      >
                        <Button variant="primary" onClick={incrementValue}>
                          <i className="fa-solid fa-minus"></i>
                        </Button>
                        <Field
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
                          }}
                          value={initialValues[`level_0_Target_${item.id}`]}
                        />
                        <Button variant="primary">
                          <i
                            className="fa-solid fa-plus"
                            onClick={decrementValue}
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
                            onClick={() => console.log("helo")}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </Button>
                          <Field
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
                            }}
                            value={
                              initialValues[`level_1_max_Target_${item.id}`]
                            }
                          />
                          <Button variant="primary">
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
                            onClick={() => console.log("helo")}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </Button>
                          <Field
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
                          <Button variant="primary">
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
                            onClick={() => console.log("helo")}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </Button>
                          <Field
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
                          <Button variant="primary">
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
                            onClick={() => console.log("helo")}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </Button>
                          <Field
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
                            }}
                            value={
                              initialValues[`level_2_max_target_${item.id}`]
                            }
                          />
                          <Button variant="primary">
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
                          variant="primary"
                          onClick={() => console.log("helo")}
                        >
                          <i className="fa-solid fa-minus"></i>
                        </Button>
                        <Field
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
                        <Button variant="primary">
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
            <CustomButton
              type="reset"
              btnText="Reset"
              variant="outline-secondary"
              disabled={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LevelThreshold2Table;

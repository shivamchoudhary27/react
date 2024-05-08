import { useTable } from "react-table";
import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  ButtonGroup,
  Button,
  OverlayTrigger,
  Tooltip as BsTooltip,
} from "react-bootstrap";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import { Formik, Form, FormikHelpers, Field } from "formik";
import { Link, useParams } from "react-router-dom";
import deleteIcon from "../../../../assets/images/icons/delete-action.svg";
import editIcon from "../../../../assets/images/icons/edit-action.svg";
import DeleteAlert from "../../../../widgets/alert/deleteAlert";
import { deleteData } from "../../../../adapters/microservices";
import Swal from "sweetalert2";
import Errordiv from "../../../../widgets/alert/errordiv";
import TableSkeleton from "../../../../widgets/skeleton/table";

type Props = {
  apiStatus: string;
  allCourseOutcome: any;
  refreshOnDeleteToggle: any;
  setActiveTab: any;
  toggleModalShow: any;
  refreshToggle: any;
  editHandlerById: any;
};

const LevelThresholdTable = (props: Props) => {
  const [deleteId, setDeleteId] = useState<number>(0);
  const [onDeleteAction, setOnDeleteAction] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const { id } = useParams();

  const tableColumn = [
    {
      Header: "SNo.",
      Cell: ({ row }: any) => <p>{row.index + 1}</p>,
    },
    {
      Header: "Course Outcomes",
      // accessor: "suffixValue",
      Cell: ({ row }: any) =>
        row.original.abbreviation + "_" + row.original.suffixValue,
    },
    {
      Header:
        "After successful completion of the course student will be able to",
      accessor: "description",
    },
    {
      Header: "Target Set (%)",
      accessor: "target",
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span className="d-flex align-items-center justify-content-evenly">
          <OverlayTrigger
            placement="top"
            overlay={<BsTooltip>Update Course Outcomes</BsTooltip>}
          >
            <Link className="action-icons" to="">
              <img
                src={editIcon}
                alt="Edit"
                onClick={() =>
                  editHandler({
                    id: row.original.id,
                    suffixValue: row.original.suffixValue,
                    target: row.original.target,
                    description: row.original.description,
                  })
                }
              />
            </Link>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            overlay={<BsTooltip>Delete Course Outcomes</BsTooltip>}
          >
            <Link
              className={`action-icons ${
                row.original.totalPrograms > 0 ? "disabled" : ""
              }`}
              to=""
            >
              <img
                src={deleteIcon}
                alt="Delete"
                onClick={
                  () =>
                    // row.original.totalPrograms < 1
                    deleteHandler(row.original.id)
                  // : null
                }
              />
            </Link>
          </OverlayTrigger>
        </span>
      ),
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, [props.allCourseOutcome]);
  const data = useMemo(() => props.allCourseOutcome, [props.allCourseOutcome]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  let count = 1;
  // const [targetData, setTargetData] = useState({})

  // const handleIncrement = (id, target, setFieldValue) => {
  //   count = count + 1;
  //   setFieldValue(`target_${id}`, count);
  //   setTargetData(preVal => ({
  //     ...preVal,
  //     [`target_${id}`] : count
  //   }))
  // };

  // const handleDecrement = (id, target, setFieldValue) => {
  //   count = count - 1;
  //   setFieldValue(`target_${id}`, count);
  //   setTargetData(preVal => ({
  //     ...preVal,
  //     [`target_${id}`] : count
  //   }))
  // };

  // edit event handler === >>>
  const editHandler = ({ id, suffixValue, target, description }) => {
    props.toggleModalShow(true);
    props.refreshToggle();
    props.editHandlerById({ id, suffixValue, target, description });
  };

  useEffect(() => {
    if (onDeleteAction === "Yes") {
      let endPoint: string = `/${id}/courseoutcomes/${deleteId}`;
      deleteData(endPoint)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            props.refreshOnDeleteToggle(true);
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: res.data,
            });
          } else if (res.status === 500) {
            // setShowAlert(true);
            // setAlertMsg({
            //   message: "Unable to delete, some error occurred.",
            //   alertBoxColor: "danger",
            // });
          }
        })
        .catch((result: any) => {
          if (result.response.status === 400) {
            // setShowAlert(true);
            // setAlertMsg({
            //   message: result.message,
            //   alertBoxColor: "danger",
            // });
          } else {
            // setShowAlert(true);
            // setAlertMsg({
            //   message: result.message,
            //   alertBoxColor: "danger",
            // });
          }
        });
    }
    setOnDeleteAction("");
  }, [onDeleteAction]);

  // delete event handler === >>>
  const deleteHandler = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
    props.refreshOnDeleteToggle(false);
  };

  // getting onDelete Modal Action === >>>
  const deleteActionResponse = (action: string) => {
    setOnDeleteAction(action);
    setShowDeleteModal(false);
  };

  return (
    <React.Fragment>
      <div className="table-responsive admin-table-wrapper copo-table mt-3">
        <Table borderless striped {...getTableProps}>
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th {...column.getHeaderProps()} key={index}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => (
                    <td {...cell.getCellProps()} key={index}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
        {props.apiStatus === "started" &&
          props.allCourseOutcome.length === 0 && (
            <TableSkeleton numberOfRows={5} numberOfColumns={4} />
          )}
        {props.apiStatus === "finished" &&
          props.allCourseOutcome.length === 0 && (
            <Errordiv msg="No record found!" cstate className="mt-3" />
          )}
        <DeleteAlert
          show={showDeleteModal}
          modalHeading="Course Outcome"
          onHide={() => setShowDeleteModal(false)}
          deleteActionResponse={deleteActionResponse}
        />
      </div>

      <div className="modal-buttons">
        <CustomButton
          type="submit"
          variant="primary"
          // isSubmitting={isSubmitting}
          onClick={() => props.setActiveTab(2)}
          btnText="Save & Continue"
        />{" "}
        {/* <CustomButton
          type="reset"
          btnText="Reset"
          variant="outline-secondary"
        /> */}
      </div>
    </React.Fragment>
  );
};

export default LevelThresholdTable;

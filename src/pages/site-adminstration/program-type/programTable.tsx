import React, { useMemo } from "react";
import { deleteData as deleteProgramData } from "../../../adapters/microservices";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import Table_Skeleton from "../../../widgets/skeleton/table";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const ProgramTable = ({
  programTypeData,
  editHandlerById,
  toggleModalShow,
  refreshProgramData,
}: any) => {
  // custom react table Column === >>>
  console.log(' re render the table data')
  const tableColumn = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Program Attached",
      accessor: "",
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          <Link to="">
            <i
              className="fa-solid fa-pen"
              onClick={() =>
                editHandler({
                  id: row.original.id,
                  name: row.original.name,
                  description: row.original.description,
                  batchYearRequired: row.original.isBatchYearRequired,
                })
              }
            ></i>
          </Link>{" "}
          <Link to="">
            <i
              className="fa-solid fa-trash"
              onClick={() => deleteHandler(row.original.id)}
            ></i>
          </Link>{" "}
          <Link to="">
            <i
              className="fa-solid fa-eye"
              onClick={() => showToggleHandler(row.original.id)}
            ></i>
          </Link>
        </span>
      ),
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => programTypeData, [programTypeData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // edit event handler === >>>
  const editHandler = ({ id, name, description, batchYearRequired }: any) => {
    toggleModalShow(true);
    editHandlerById({ id, name, description, batchYearRequired });
    refreshProgramData();
  };

  // delete event handler === >>>
  const deleteHandler = (id: number) => {
    if (window.confirm("Are you sure you want to delete?" + id)) {
      let endpoint = `/program-types/${id}`;
      deleteProgramData(endpoint).then((res: any) => {
        // if (res.data !== "" && res.status === 200) {
        //   // refreshProgramData();
        // }
      });      
      setTimeout(() => {
        refreshProgramData();
      }, 3000)
    }
    // const swalWithBootstrapButtons = Swal.mixin({
    //   customClass: {
    //     confirmButton: "btn btn-success",
    //     cancelButton: "btn btn-danger",
    //   },
    //   buttonsStyling: true,
    // });
    // swalWithBootstrapButtons
    //   .fire({
    //     title: "Are you sure to delete?",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonText: "Yes, delete it!",
    //     cancelButtonText: "No, cancel!",
    //     reverseButtons: true,
    //   })
    //   .then((result) => {
    //     if (result.isConfirmed) {
    //       Swal.fire({
    //         icon: "success",
    //         title: "Deleted Successfully",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //       let endpoint = `/program-types/${id}`;
    //       deleteProgramData(endpoint).then((res: any) => {
    //         if (res.data !== "" && res.status === 200) {
    //           refreshProgramData();
    //         }
    //       });
    //     } else if (result.dismiss === Swal.DismissReason.cancel) {
    //       Swal.fire({
    //         icon: "error",
    //         title: "Cancelled",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //     }
    //   });
  };

  // hide show toggle event handler === >>>
  const showToggleHandler = (id: number) => {
    console.log(id);
  };

  return (
    <>
      <div className="table-wrapper mt-3">
        <Table bordered hover {...getTableProps}>
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
        {programTypeData.length === 0 && <Table_Skeleton numberOfRows={5} numberOfColumns={4} />}
      </div>
    </>
  );
};

export default ProgramTable;

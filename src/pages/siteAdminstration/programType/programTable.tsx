import React, { useMemo } from "react";
import { deleteData as deleteProgramData } from "../../../adapters/microservices";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
import "sweetalert2/src/sweetalert2.scss";
import TableSkeleton from "../../../widgets/skeleton/table";
import Errordiv from "../../../widgets/alert/errordiv";

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
  refreshOnDelete,
  apiStatus,
  currentInstitute
}: any) => {
  // custom react table Column === >>>
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
    refreshOnDelete(false);
    if (window.confirm("Are you sure you want to delete this program type?")) {
      let endpoint = `/${currentInstitute}/program-types/${id}`;
      deleteProgramData(endpoint).then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          refreshOnDelete(true);
        } else if (res.status === 500) {
          window.alert('Unable to delete, this program might have been used in some programs');
        }
      }).catch((result : any) => {
        if (result.response.status === 400) {
          window.alert(result.response.data.message);
        } else {
          window.alert(result.response.data.message);
        }      
      });
      setTimeout(() => {
        refreshProgramData();
      }, 3000)
    }
  };

  // hide show toggle event handler === >>>
  const showToggleHandler = (id: number) => {
    console.log(id);
  };

  return (
    <>
      <div className="table-wrapper mt-3">
        <Table borderless striped hover {...getTableProps}>
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
        {apiStatus === "started" && programTypeData.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && programTypeData.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
    </>
  );
};

export default ProgramTable;

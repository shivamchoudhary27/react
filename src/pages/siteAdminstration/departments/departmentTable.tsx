import React, { useMemo } from "react";
import { deleteData as deleteDepartmentData } from "../../../adapters/microservices";
import Table from "react-bootstrap/Table";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import TableSkeleton from "../../../widgets/skeleton/table";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const DepartmentTable = ({
  departmentData,
  editHandlerById,
  toggleModalShow,
  refreshDepartmentData,
  refreshOnDelete
}: any) => {
  // custom react table Column === >>>
  const tableColumn = [
    {
      Header: "Department",
      accessor: "name",
    },
    {
      Header: "No of Programs",
      Cell: () => {
        <span>{2}</span>;
      },
    },
    {
      Header: "Manage Programs",
      Cell: ({ row }: any) => {
        <Link to="">
          <i
            className="fa-solid fa-pen"
            onClick={() =>
              console.log(`Navigate to setting page. Id - ${row.id}`)
            }
          ></i>
        </Link>;
      },
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          <Link to="">
            <i
              className="fa-solid fa-pen"
              onClick={() =>
                editHandler({ id: row.original.id, name: row.original.name })
              }
            ></i>
          </Link>
          <Link to="">
            <i
              className="fa-solid fa-trash"
              onClick={() => deleteHandler(row.original.id)}
            ></i>
          </Link>
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
  const data = useMemo(() => departmentData, [departmentData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // edit event handler === >>>
  const editHandler = ({ id, name }: any) => {
    toggleModalShow(true);
    editHandlerById({ id, name });
    refreshDepartmentData();
  };

  // delete event handler === >>>
  const deleteHandler = (id: number) => {
    refreshOnDelete(false);
    if (window.confirm('Are you sure to delete this department?')) {
      let endPoint = `/departments/${id}`;
      deleteDepartmentData(endPoint).then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          refreshOnDelete(true);
        } else if (res.status === 500) {
          window.alert('Unable to delete, some error occurred');
        }
      }).catch((result : any) => {
        if (result.response.status === 400) {
          window.alert(result.response.data.message);
        } else {
          window.alert(result.response.data.message);
        }      
      });
    }
  };

  // hide show toggle event handler === >>>
  const showToggleHandler = (id: number) => {
    console.log(id);
  };

  return (
    <>
      <div className="table-wrapper mt-5">
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
        {departmentData.length === 0 && <TableSkeleton numberOfRows={5} numberOfColumns={4} />}
      </div>
    </>
  );
};

export default DepartmentTable;
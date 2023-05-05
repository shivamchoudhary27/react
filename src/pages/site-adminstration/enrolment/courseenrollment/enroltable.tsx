import React, { useMemo } from "react";
import { deleteData as deleteDisciplineData } from "../../../../adapters/microservices";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
import "sweetalert2/src/sweetalert2.scss";
import TableSkeleton from "../../../../widgets/skeleton/table";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const DiciplineTable = ({
  diciplineData,
  editHandlerById,
  toggleModalShow,
  refreshDisciplineData,
  refreshOnDelete,
  courseid,
}: any) => {
  // custom react table column === >>>
  const tableColumn = [
    {
      Header: "Firstname / Surname",
      Cell: ({ row }: any) =>
        `${row.original.userFirstName} ${row.original.userLastName}`,
    },
    {
      Header: "Email address",
      accessor: "userEmail",
    },
    {
      Header: "Roles",
      Cell: ({ row }: any) =>
        `${
          row.original.userRole.charAt(0).toUpperCase() +
          row.original.userRole.slice(1)
        }`,
    },
    {
      Header: "Groups",
      accessor: "groupName",
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
                  userId: row.original.userId,
                  userEmail: row.original.userEmail,
                  groupId: row.original.groupId,
                })
              }
            ></i>
          </Link>
          <Link to="">
            <i
              className="fa-solid fa-trash"
              onClick={() => deleteHandler(row.original.userId)}
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
  const data = useMemo(() => diciplineData, [diciplineData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // edit event handler === >>>
  const editHandler = ({ userId, userEmail, groupId }: any) => {
    toggleModalShow(true);
    editHandlerById({ userId, userEmail, groupId });
    // refreshDisciplineData();
  };

  // delete event handler === >>>
  const deleteHandler = (userId: number) => {
    refreshOnDelete(false);
    if (window.confirm("Are you sure to unenrol this user?")) {
      let endpoint = `/course/${courseid}/enrol-user/${userId}`;
      deleteDisciplineData(endpoint)
        .then((res: any) => {
          console.log(res);
          if (res.data !== "" && res.status === 200) {
            refreshOnDelete(true);
          } else if (res.status === 500) {
            window.alert("Unable to delete");
          }
        })
        .catch((result: any) => {
          console.log(result);
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
    <React.Fragment>
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
        {diciplineData.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
      </div>
    </React.Fragment>
  );
};

export default DiciplineTable;

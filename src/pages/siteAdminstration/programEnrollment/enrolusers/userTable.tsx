import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { usersRawData } from "./data";
import deleteIcon from "../../../../assets/images/icons/delete-action.svg";
import infoIcon from "../../../../assets/images/icons/info-action.svg";
import gearIcon from "../../../../assets/images/icons/setting-action.svg";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const UserTable = () => {
  // custom react table Column === >>>
  const tableColumn = [
    {
      Header: "Firstname/Surname",
      accessor: "firstname",
    },
    {
      Header: "Username",
      accessor: "username",
    },
    {
      Header: "Email address",
      accessor: "email",
    },
    {
      Header: "Role",
      accessor: "role",
    },
    {
      Header: "Groups",
      accessor: "groups",
    },
    {
      Header: "Last access to course",
      accessor: "access",
    },

    {
      Header: "Status",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          <Button variant="success" size="sm" disabled>
            Active
          </Button>
          <Link className="action-icons" to="">
            <img src={infoIcon} alt="Info" />
          </Link>
          <Link className="action-icons" to="">
            <img src={gearIcon} alt="Setting" />
          </Link>
          <Link className="action-icons" to="">
            <img src={deleteIcon} alt="Delete" />
          </Link>
        </span>
      ),
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => usersRawData, [usersRawData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <React.Fragment>
      <div className="table-wrapper mt-5">
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
        {/* {departmentData.length === 0 && <TableSkeleton numberOfRows={5} numberOfColumns={4} />} */}
      </div>
    </React.Fragment>
  );
};

export default UserTable;

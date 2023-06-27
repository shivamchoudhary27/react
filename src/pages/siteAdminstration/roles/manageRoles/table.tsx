import React, { useMemo } from "react";
import { Table } from "react-bootstrap";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import editIcon from "../../../../assets/images/icons/edit-action.svg";
import deleteIcon from "../../../../assets/images/icons/delete-action.svg";
import showIcon from "../../../../assets/images/icons/show-action.svg";
import hideIcon from "../../../../assets/images/icons/hide-action.svg";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const RolesTable = () => {
  const tableColumn = [
    {
      Header: "Role Name",
      accessor: "name",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Permission",
      Cell: ({ row }: any) => (
        <Link className="action-icons" to="/permission">
          View Permission
        </Link>
      ),
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          <Link className="action-icons" to={""}>
            <img src={editIcon} alt="Edit" />
          </Link>
          <Link className="action-icons" to="">
            <img src={deleteIcon} alt="Delete" />
          </Link>
          <Link className="action-icons" to="">
            <img
              src={row.original.enabled !== false ? showIcon : hideIcon}
              alt="Show"
            />
          </Link>
        </span>
      ),
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => userdata, [userdata]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <React.Fragment>
      <div className="table-responsive table-wrapper mt-3">
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
      </div>
    </React.Fragment>
  );
};

export default RolesTable;

const userdata = [
  {
    name: "Role 1",
    description: "Lorem ipsum...",
  },
  {
    name: "Role 2",
    description: "Lorem ipsum...",
  },
  {
    name: "Role 3",
    description: "Lorem ipsum...",
  },
];

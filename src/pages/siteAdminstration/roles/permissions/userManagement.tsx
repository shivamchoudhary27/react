import React, { useState, useMemo } from "react";
import { Table } from "react-bootstrap";
import { useTable } from "react-table";

const UserManagement = () => {
  const [userPermissions, setUserPermissions] = useState<any>([
    {id: 1, name: "Create User", permitted: false },
    {id: 2, name: "Update User", permitted: false },
    {id: 3, name: "Delete User", permitted: true },
    {id: 4, name: "View User", permitted: false },
  ]);
  const tableColumn = [
    {
      Header: "User Management",
      accessor: "name",
    },
    {
      Header: (
        <div>
          <input 
            type="checkbox" className="form-check-input" 
            name="selectall"
            // checked={true}
            onChange={(e) => {handleAllChecked(e)}}
          /> Check All
        </div>
      ),
      accessor: "permitted",
      Cell: ({ row }: any) => {
        return (
          <div>
            <input 
              type="checkbox" 
              name={row.original.id}
              className="form-check-input" 
              checked={row.original.permitted}
              onChange={(e) => {handleSingleChecked(e)}}
            /> Allow
          </div>
        );
      },
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => userPermissions, [userPermissions]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const handleAllChecked = (e : any) => {
    let updatePermission = [];
    if (e.target.checked === true) {
      updatePermission = Array.from(userPermissions, (user) => ({
        ...user,
        permitted: true,
      }));
    } else {
      updatePermission = Array.from(userPermissions, (user) => ({
        ...user,
        permitted: false,
      }));
    }
    setUserPermissions(updatePermission)
  }

  const handleSingleChecked = (e: any) => {
    console.log('just got chnages in single', e.target.name)
  }

  return (
    <React.Fragment>
      <div className="table-responsive admin-table-wrapper mt-3">
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
export default UserManagement;

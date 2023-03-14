import { useMemo } from "react";
import { Table } from "react-bootstrap";
import { ManageRawData } from "./rawData";
import { useTable } from "react-table";
import { useNavigate, Link } from "react-router-dom";

// edit event handler === >>>
const createEditLink = (id : number) => {
  return `/addprogram?id=${id}`;
};

const tableColumn = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Batch Year",
    accessor: "batchYear",
  },
  {
    Header: "Program Code",
    accessor: "programCode",
  },
  {
    Header: "Manage Categories",
    // accessor: "categories",
    Cell: ({ row }: any) => (
      <Link to="/managecategory">
        <i className="fa-solid fa-code-branch"></i>
      </Link>
    ),
  },
  {
    Header: "Manage Courses",
    accessor: "manage_courses",
    Cell: ({ row }: any) => (
      <Link to="/managecourses">
        <i className="fa-solid fa-copy"></i>
      </Link>
    ),
  },
  {
    Header: "Manage Users",
    accessor: "manage_users",
    Cell: ({ row }: any) => (
      <Link to="/manageusers">
        <i className="fa fa-users"></i>
      </Link>
    ),
  },
  {
    Header: "Actions",
    Cell: ({ row }: any) => (
      <span>
        <Link to={createEditLink(row.original.id)}>
          <i
            className="fa-solid fa-pen"
          ></i>
        </Link>
        <Link to="">
          <i
            className="fa-solid fa-trash"
            // onClick={() => deleteHandler(row.original.id)}
          ></i>
        </Link>
        <Link to="">
          <i
            className="fa-solid fa-eye"
            // onClick={() => showToggleHandler(row.original.id)}
          ></i>
        </Link>
      </span>
    ),
  },
];

const ManageTable = ({programData} : any) => {
  const navigate = useNavigate();
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => programData, [programData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <>
      <div className="table-wrapper mt-3">
        <Table bordered hover {...getTableProps()}>
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
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => (
                    <td {...cell.getCellProps()} key={index}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ManageTable;

import { useMemo } from "react";
import { Table } from "react-bootstrap";
import { useTable } from "react-table";
import { useNavigate, Link } from "react-router-dom";
import { deleteData as deleteProgramData } from "../../../adapters/microservices";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import TableSkeleton from "../../../widgets/skeleton/table";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

// edit event handler === >>>
const createEditLink = (id: number) => {
  return `/addprogram/${id}`;
};

const createPreviewLink = (id: number) => {
  return `/programpreview/${id}`;
}

const ManageTable = ({programData, refreshDepartmentData, refreshOnDelete} : any) => {

  const tableColumn = [
    {
      Header: "Name",
      accessor: "name",
      Cell: ({ row }: any) => (
        <Link to={createPreviewLink(row.original.id)}>
           {row.original.name}
        </Link>
      ),
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
        <Link to={`/managecategory/${row.original.id}/${row.original.name}`}>
          <i className="fa-solid fa-code-branch"></i>
        </Link>
      ),
    },
    {
      Header: "Manage Courses",
      accessor: "manage_courses",
      Cell: ({ row }: any) => (
        <Link to={`/managecourses/${row.original.id}/${row.original.name}`}>
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
        <span  style={actionsStyle}>
          <Link to={createEditLink(row.original.id)}>
            <i
              className="fa-solid fa-pen"
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
              // onClick={() => showToggleHandler(row.original.id)}
            ></i>
          </Link>
        </span>
      ),
    },
  ];

  const navigate = useNavigate();
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => programData, [programData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const deleteHandler = (id: number) => {
    refreshOnDelete(false);
    if (window.confirm('Are you sure to delete this department?')) {
      let endPoint = `programs/${id}`;
      deleteProgramData(endPoint).then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          refreshOnDelete(true);
        } else if (res.status === 500) {
          window.alert('Unable to delete, some error occured');
        }
      }).catch((result : any) => {
        if (result.response.status === 400) {
          window.alert(result.response.data.message);
        } else if (result.response.status === 500) {
          window.alert(result.response.data.message);
        }            
      });
    }
  };

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
          {programData.length > 0
           &&
          <tbody {...getTableBodyProps()}>
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
          }
          </Table>
        {programData.length === 0 && <TableSkeleton numberOfRows={5} numberOfColumns={4} />}
      </div>
    </>
  );
};

export default ManageTable;

import Table from "react-bootstrap/Table";

function DepartmentTable() {
  return (
    <>
      <div className="table-wrapper mt-5">
        <Table  bordered hover>
          <thead>
            <tr>
              <th>Department</th>
              <th>No of Programs</th>
              <th>Manage Programs</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Computer Department</td>
              <td>4</td>
              <td><i className="fa-solid fa-gear"></i></td>
              <td>
                <span><i className="fa-solid fa-pen"></i></span>{' '}
                <span><i className="fa-solid fa-trash"></i></span>{' '}
                <span><i className="fa-solid fa-eye"></i></span>
              </td>
            </tr>
            <tr>
              <td>Electronics Department</td>
              <td>5</td>
              <td><i className="fa-solid fa-gear"></i></td>
              <td>
                <span><i className="fa-solid fa-pen"></i></span>{' '}
                <span><i className="fa-solid fa-trash"></i></span>{' '}
                <span><i className="fa-solid fa-eye"></i></span>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default DepartmentTable;

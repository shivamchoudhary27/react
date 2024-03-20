import React, { useMemo, useState } from "react";
import { Alert, Button, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useTable } from "react-table";
import TableSkeleton from "../../../../../widgets/skeleton/table";
import Errordiv from "../../../../../widgets/alert/errordiv";
import { postData } from "../../../../../adapters/microservices";
import { useSelector } from "react-redux";
import TimerAlertBox from "../../../../../widgets/alert/timerAlert";
import Swal from "sweetalert2";
import EnrolIcon from "../../../../../assets/images/icons/enrolluser.svg"

type Props = {
  apiStatus: string;
  minorCourseData: any;
  toggleModalShow: any;
  editHandlerById: any;
  getUserModalInfo:any
};

const UserWaitlistTable = (props: Props) => {


  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  const institute_id = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );

  const handleEnrollClick = (userId,courseId,firstName,lastName,email) => {
    props.toggleModalShow(true);
    props.getUserModalInfo(userId,courseId,firstName,lastName,email)
   }
    const { apiStatus, minorCourseData } = props;
    const tableColumn = [
      {
        Header: "Name",
        accessor: (row: any) =>
          `${row.firstName.charAt(0).toUpperCase()}${row.firstName.slice(1)} ${row.lastName.charAt(0).toUpperCase()}${row.lastName.slice(1)}`
      },
      {
        Header: "Email",
        accessor: "email" 
      },
      // Conditionally render the "Actions" column and hide its header
      ...(minorCourseData.items.some((item: any) => item.waitListProcessMode === "MANUAL") ? 
      [{
        Header: "Actions",
        accessor: "actions", // This can be any accessor value you like
        Cell: ({ row }: any) => (
          // console.log(row.original.courseId)
        // <>conso
          <Button
            className="enroll-btn"
            key={row.original.courseId} 
            onClick={() => handleEnrollClick( row.original.userId,row.original.courseId,row.original.firstName,row.original.lastName,row.original.email)}
          >
           <img
              src={EnrolIcon}
              alt="Enroll"
            />
            <span> Enroll</span>
           </Button>
        //   </>
        )
      }] : [])
    ];
  
    const { programid } = useParams();
  
    const columns = useMemo(() => tableColumn, [minorCourseData.items]);
    const data = useMemo(() => props.minorCourseData.items, [props.minorCourseData]);
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow
    } = useTable({ columns, data });
    return (
      <>
       <TimerAlertBox
            alertMsg={alertMsg.message}
            className="mt-3"
            variant={alertMsg.alertBoxColor}
            setShowAlert={setShowAlert}
            showAlert={showAlert}
          />

      
        <div className="table-responsive admin-table-wrapper mt-3">
          <Table borderless striped {...getTableProps()}>
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
                      <td {...cell.getCellProps()} key={index}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </Table>
          {apiStatus === "started" && minorCourseData.items.length === 0 && (
            <TableSkeleton numberOfRows={5} numberOfColumns={4} />
          )}
          {apiStatus === "finished" && minorCourseData.items.length === 0 && (<>
            <Errordiv msg="No record found!" cstate className="mt-3" />
          </>
          )}
        </div>
         
      </>
    );
  };
  
  export default UserWaitlistTable;
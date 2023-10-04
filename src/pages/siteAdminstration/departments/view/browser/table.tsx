import React from "react";
import Table from "react-bootstrap/Table";
import "sweetalert2/src/sweetalert2.scss";
import { Type_AlertMsg } from "../../type/type";
import Errordiv from "../../../../../widgets/alert/errordiv";
import TableSkeleton from "../../../../../widgets/skeleton/table";
import DeleteAlert from "../../../../../widgets/alert/deleteAlert";
import TimerAlertBox from "../../../../../widgets/alert/timerAlert";

type Props = {
  commonProps: {
    rows: any;
    prepareRow: any;
    apiStatus: string;
    headerGroups: any;
    showAlert: boolean;
    getTableProps: any;
    departmentData: any;
    getTableBodyProps: any;
    alertMsg: Type_AlertMsg;
    showDeleteModal: boolean;
    deleteActionResponse: (params: string) => void;
    setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

const BrowserDepartmentTable: React.FunctionComponent<Props> = ({
  commonProps,
}: Props) => {
  return (
    <>
      <TimerAlertBox
        className="mt-3"
        showAlert={commonProps.showAlert}
        alertMsg={commonProps.alertMsg.message}
        variant={commonProps.alertMsg.alertBoxColor}
        setShowAlert={commonProps.setShowAlert}
      />
      <div className="table-responsive admin-table-wrapper mt-3">
        <Table borderless striped {...commonProps.getTableProps}>
          <thead>
            {commonProps.headerGroups.map((headerGroup: any, index: number) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column: any, index: number) => (
                  <th {...column.getHeaderProps()} key={index}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...commonProps.getTableBodyProps}>
            {commonProps.rows.map((row: any, index: number) => {
              commonProps.prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell: any, index: number) => (
                    <td {...cell.getCellProps()} key={index}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
        {commonProps.apiStatus === "started" && commonProps.departmentData.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {commonProps.apiStatus === "finished" &&
          commonProps.departmentData.length === 0 && (
            <Errordiv msg="No record found!" cstate className="mt-3" />
          )}
      </div>
      <DeleteAlert
        show={commonProps.showDeleteModal}
        modalHeading="Department"
        onHide={() => commonProps.setShowDeleteModal(false)}
        deleteActionResponse={commonProps.deleteActionResponse}
      />
    </>
  );
};

export default BrowserDepartmentTable;

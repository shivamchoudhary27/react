import React from "react";
import { Table } from "react-bootstrap";
import { Type_AlertMsg } from "../../type/type";
import Errordiv from "../../../../../widgets/alert/errordiv";
import TableSkeleton from "../../../../../widgets/skeleton/table";
import DeleteAlert from "../../../../../widgets/alert/deleteAlert";
import TimerAlertBox from "../../../../../widgets/alert/timerAlert";

type props = {
  commonProps: {
    rows: any;
    prepareRow: any;
    headerGroups: any;
    apiStatus: string;
    showAlert: boolean;
    getTableProps: any;
    diciplineData: any;
    getTableBodyProps: any;
    alertMsg: Type_AlertMsg;
    showDeleteModal: boolean;
    deleteActionResponse: (params: string) => void;
    setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

const BrowserDiciplineTable: React.FunctionComponent<props> = ({
  commonProps,
}: props) => {
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
        {commonProps.apiStatus === "started" &&
          commonProps.diciplineData.length === 0 && (
            <TableSkeleton numberOfRows={5} numberOfColumns={4} />
          )}
        {commonProps.apiStatus === "finished" &&
          commonProps.diciplineData.length === 0 && (
            <Errordiv msg="No record found!" cstate className="mt-3" />
          )}
      </div>
      <DeleteAlert
        show={commonProps.showDeleteModal}
        onHide={() => commonProps.setShowDeleteModal(false)}
        deleteActionResponse={commonProps.deleteActionResponse}
        modalHeading="Discipline"
      />
    </>
  );
};

export default BrowserDiciplineTable;

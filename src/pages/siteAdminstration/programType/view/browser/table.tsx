import React from "react";
import { Table } from "react-bootstrap";
import { Type_AlertMsg } from "../../type/types";
import Errordiv from "../../../../../widgets/alert/errordiv";
import TableSkeleton from "../../../../../widgets/skeleton/table";
import DeleteAlert from "../../../../../widgets/alert/deleteAlert";
import TimerAlertBox from "../../../../../widgets/alert/timerAlert";

type Props = {
  commonProps: {
    rows: any;
    prepareRow: any;
    headerGroups: any;
    apiStatus: string;
    getTableProps: any;
    showAlert: boolean;
    programTypeData: any;
    getTableBodyProps: any;
    showDeleteModal: boolean;
    alertMsg: Type_AlertMsg;
    setShowDeleteModal: (params: boolean) => void;
    deleteActionResponse: (params: string) => void;
    setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

const BrowserProgramTable: React.FunctionComponent<Props> = ({
  commonProps,
}: Props) => {
  return (
    <React.Fragment>
      <TimerAlertBox
        className="mt-3"
        showAlert={commonProps.showAlert}
        setShowAlert={commonProps.setShowAlert}
        alertMsg={commonProps.alertMsg.message}
        variant={commonProps.alertMsg.alertBoxColor}
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
          commonProps.programTypeData.length === 0 && (
            <TableSkeleton numberOfRows={5} numberOfColumns={4} />
          )}
        {commonProps.apiStatus === "finished" &&
          commonProps.programTypeData.length === 0 && (
            <Errordiv msg="No record found!" cstate className="mt-3" />
          )}
      </div>
      <DeleteAlert
        modalHeading="Program Type"
        show={commonProps.showDeleteModal}
        onHide={() => commonProps.setShowDeleteModal(false)}
        deleteActionResponse={commonProps.deleteActionResponse}
      />
    </React.Fragment>
  );
};

export default BrowserProgramTable;

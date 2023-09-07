import { useTable } from "react-table";
import { useDispatch } from "react-redux";
import "sweetalert2/src/sweetalert2.scss";
import { Link, useNavigate } from "react-router-dom";
import MobileDepartmentTable from "./view/mobile/table";
import BrowserDepartmentTable from "./view/browser/table";
import { isMobile, isDesktop } from "react-device-detect";
import React, { useMemo, useState, useEffect } from "react";
import { Type_AlertMsg, Type_DepartmentObj } from "./types/type";
import editIcon from "../../../assets/images/icons/edit-action.svg";
import showIcon from "../../../assets/images/icons/show-action.svg";
import hideIcon from "../../../assets/images/icons/hide-action.svg";
import { globalAlertActions } from "../../../store/slices/globalAlerts";
import deleteIcon from "../../../assets/images/icons/delete-action.svg";
import { globalFilterActions } from "../../../store/slices/globalFilters";
import programIcon from "../../../assets/images/icons/manage-program-action.svg";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
};

type Props = {
  permissions: any;
  apiStatus: string;
  departmentData: any;
  editHandlerById: any;
  currentInstitute: number;
  refreshDepartmentData: () => void;
  refreshOnDelete: (param: boolean) => void;
  toggleModalShow: (param: boolean) => void;
};

const DepartmentTable: React.FunctionComponent<Props> = ({
  ...props
}: Props) => {
  // custom react table Column === >>>
  const tableColumn = [
    {
      Header: "Department",
      accessor: "name",
    },
    {
      Header: "Program Attached",
      accessor: "totalPrograms",
    },
    {
      Header: "Manage Programs",
      Cell: ({ row }: any) => (
        <Link
          className="action-icons"
          to=""
          onClick={() => manageDepartmentPrograms(row.original.id)}
        >
          <img src={programIcon} alt="Manage Program" />
        </Link>
      ),
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          {props.permissions.canEdit && (
            <Link className="action-icons" to="">
              <img
                src={editIcon}
                alt="Edit"
                onClick={() =>
                  editHandler({
                    id: row.original.id,
                    name: row.original.name,
                    published: row.original.published,
                  })
                }
              />
            </Link>
          )}
          {props.permissions.canDelete && (
            <Link
              className={`action-icons ${
                row.original.totalPrograms > 0 ? "disabled" : ""
              }`}
              to=""
            >
              <img
                src={deleteIcon}
                alt="Delete"
              />
            </Link>
          )}
          {props.permissions.canEdit && (
            <Link
              className="action-icons"
              to=""
            >
              <img
                src={row.original.published !== false ? showIcon : hideIcon}
                alt="Show"
              />
            </Link>
          )}
        </span>
      ),
    },
  ];

  // react table custom variable decleration === >>>
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => props.departmentData, [props.departmentData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <React.Fragment>
      {isMobile ? (
        <MobileDepartmentTable commonProps={commonProps} />
      ) : isDesktop ? (
        <BrowserDepartmentTable commonProps={commonProps} />
      ) : (
        <BrowserDepartmentTable commonProps={commonProps} />
      )}
    </React.Fragment>
  );
};

export default DepartmentTable;

import React from "react";
import { Table } from "react-bootstrap";

const Module_Table = ({ Field }: any) => {
  return (
    <>
      <Table hover responsive size="sm">
        <tbody>
          <tr>
            <td>
              <h4>Event-Type</h4>
            </td>
          </tr>
          {event_type.map((el, index) => (
            <CALENDER_MODULES el={el} key={index} Field={Field} />
          ))}

          <tr>
            <td>
              <h4 className="mt-3">Module</h4>
            </td>
          </tr>
          {module_data.map((el, index) => (
            <CALENDER_MODULES el={el} key={index} Field={Field} />
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Module_Table;

const CALENDER_MODULES = ({ el, Field }: any) => (
  <tr>
    <td style={{ textTransform: "capitalize" }}>
      <span className={el.icon}></span> {el.label}
    </td>
    <td>
      <div className="mb-3">
        <Field id={el.label} name={el.label} className="form-control" />
      </div>
    </td>
  </tr>
);

const event_type = [
  {
    label: "user",
    icon: "fa-solid fa-user",
  },
  {
    label: "course",
    icon: "fa-solid fa-graduation-cap",
  },
  {
    label: "site",
    icon: "fa-solid fa-file",
  },
  {
    label: "category",
    icon: "fa-solid fa-sitemap",
  },
];

const module_data = [
  {
    label: "attendance",
    icon: "fa-solid fa-file",
  },  
  {
    label: "forum",
    icon: "fa-solid fa-file",
  },
  {
    label: "quiz",
    icon: "fa-solid fa-file",
  },
  {
    label: "workshop",
    icon: "fa-solid fa-briefcase",
  },
  {
    label: "assignment",
    icon: "fa-solid fa-file",
  },
  {
    label: "page",
    icon: "fa-solid fa-file",
  },
  {
    label: "book",
    icon: "fa-solid fa-book",
  },
];

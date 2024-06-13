import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { Link, useParams } from "react-router-dom";
import {
  Alert,
  AlertHeading,
  Button,
  ButtonGroup,
  OverlayTrigger,
  Tooltip as BsTooltip,
  Table,
} from "react-bootstrap";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import RouterLadyLoader from "../../../../globals/globalLazyLoader/routerLadyLoader";
import TableSkeleton from "../../../../widgets/skeleton/table";
import Errordiv from "../../../../widgets/alert/errordiv";
import Swal from "sweetalert2";

// const initialValues = {};

const ViewTable = ({
  setActiveTab,
  programOutcomes,
  courseoutcomeApiStatus,
}: any) => {
  const [apiStatus, setApiStatus] = useState("");
  const [reachMaxColumnMsg, setReachMaxColumnMsg] = useState({
    status: false,
    msg: "",
  });
  const [apiCatchError, setApiCatchError] = useState({
    status: false,
    msg: "",
  });
  
  const numberOfPOs = 12;
  const numberOfPSOs = 2;

  // Calculate average for each PO and PSO
  const outcomeNames = [
    ...Array.from({ length: numberOfPOs }).map((_, index) => `PO${index + 1}`),
    ...Array.from({ length: numberOfPSOs }).map(
      (_, index) => `PSO${index + 1}`
    ),
  ];
  
  const averages = outcomeNames.map((name) => {
    const attainmentLevels = programOutcomes
    .flatMap((item: { programOutcomeDtos: any }) => item.programOutcomeDtos)
    .filter((dto: { name: string }) => dto.name === name)
    .map((dto: { average: any }) => dto.average);
    
    const sum = attainmentLevels.reduce((acc: any, curr: any) => acc + curr, 0);
    return attainmentLevels.length > 0
    ? (sum / attainmentLevels.length).toFixed(2)
    : "";
  });
  
  const CsvAttainment = programOutcomes.map((item:any) => item);

  // Function to calculate averages
  const calculateAverages = () => {
    return outcomeNames.map((name) => {
      const attainmentLevels = programOutcomes
        .flatMap((item: { programOutcomeDtos: any }) => item.programOutcomeDtos)
        .filter((dto: { name: string }) => dto.name === name)
        .map((dto: { average: any }) => dto.average);

      const sum = attainmentLevels.reduce((acc: any, curr: any) => acc + curr, 0);
      return attainmentLevels.length > 0
        ? (sum / attainmentLevels.length).toFixed(2)
        : "";
    });
  };

  // Calculate averages for CSV export
  const averagesCsv = calculateAverages();

  // Function to download CSV of unuploaded users
  const downloadCourseOutcomeCSV = (data:any) => {
       // Define headers
    const headers = ["Course Outcome", ...outcomeNames.map((name) => `${name}`)];

    // Prepare rows for each course outcome
    const rows = data.map((item: { suffixValue: any; abbreviation: any; programOutcomeDtos: any[]; }) => {
      const suffixValue = item.suffixValue;
      const abbreviation = item.abbreviation;
      const courseOutcome = `${abbreviation}-${suffixValue}`;

      // Create a map of outcome names to their attainment levels
      const outcomeMap = item.programOutcomeDtos.reduce((acc, outcome) => {
        acc[outcome.name] = outcome.attainmentlevel;
        return acc;
      }, {});

      // Prepare the row for the course outcome
      return [
        courseOutcome,
        ...outcomeNames.map((name) => (outcomeMap[name] != null ? outcomeMap[name] : "-")),
      ];
    });

    // Add the averages row
    const averageRow = ["Average", ...averagesCsv.map((avg) => (avg !== "" ? avg : "-"))];
    rows.push(averageRow);

    // Combine headers and rows
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row: any[]) => row.join(","))].join("\n");

    // Create a link element
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "Course_outcome_report.csv");

    // Trigger the download
    document.body.appendChild(link);
    link.click();

    Swal.fire({
      timer: 3000,
      width: "25em",
      color: "#666",
      icon: "success",
      background: "#e7eef5",
      showConfirmButton: false,
      text: "Course outcome report CSV file downloaded!",
    });
  };
  
  return (
    <>
      {reachMaxColumnMsg.status && (
        <Alert
          key="danger"
          variant="danger"
          onClose={() => setReachMaxColumnMsg({ status: false, msg: "" })}
          dismissible
        >
          {reachMaxColumnMsg.msg}
        </Alert>
      )}
      {apiCatchError.status && (
        <Alert
          key="danger"
          variant="danger"
          onClose={() => setApiCatchError({ status: false, msg: "" })}
          dismissible
        >
          {apiCatchError.msg}
        </Alert>
      )}
      {apiStatus !== "started" ? (
        <Formik
          initialValues={{}}
          onSubmit={(values, action) => {
            // handleSubmit(values, action);
          }}
        >
          {({ isSubmitting, handleChange }) => (
            <Form>
              <div className="table-responsive admin-table-wrapper copo-table mt-3">
                <Table borderless striped className="attandence-table">
                  <thead>
                    <tr>
                      <th>Course Outcomes</th>
                      {outcomeNames.map((name, index) => (
                        <th key={index}>{name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {programOutcomes.map(
                      (item: {
                        id: React.Key | null | undefined;
                        abbreviation: any;
                        suffixValue: any;
                        programOutcomeDtos: any[];
                      }) => (
                        <tr key={item.id}>
                          <td>{`${item.abbreviation}_${item.suffixValue}`}</td>
                          {outcomeNames.map((name, index) => {
                            const attainment = item.programOutcomeDtos.find(
                              (dto) => dto.name === name
                            );
                            return (
                              <td key={`${item.id}-${name}`}>
                                {attainment ? attainment.attainmentlevel : "-"}
                              </td>
                            );
                          })}
                        </tr>
                      )
                    )}
                    {programOutcomes.length > 0 && (
                      <tr>
                        <td>Average</td>
                        {averages.map((average, index) => (
                          <td key={index}>{average ? average : "-"}</td>
                        ))}
                      </tr>
                    )}
                  </tbody>
                </Table>
                {courseoutcomeApiStatus === "started" &&
                  programOutcomes.length === 0 && (
                    <TableSkeleton numberOfRows={5} numberOfColumns={4} />
                  )}
                {courseoutcomeApiStatus === "finished" &&
                  programOutcomes.length === 0 && (
                    <Errordiv msg="No record found!" cstate className="mt-3" />
                  )}
              </div>
              <div className="modal-buttons">
                <CustomButton
                  type="submit"
                  variant="primary"
                  disabled={programOutcomes.length === 0}
                  btnText="Download"
                  onClick={() => {
                    downloadCourseOutcomeCSV(CsvAttainment);
                  }}
                />
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <RouterLadyLoader status={true} />
      )}
    </>
  );
};

export default ViewTable;

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
                                {attainment ? attainment.attainmentlevel : ""}
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
                          <td key={index}>{average}</td>
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
                  disabled={isSubmitting}
                  btnText="Download"
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

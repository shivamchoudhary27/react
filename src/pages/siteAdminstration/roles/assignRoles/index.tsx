import "./style.scss";
import View from "./view";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { pagination } from "../../../../utils/pagination";
import { getData } from "../../../../adapters/coreservices";
import { makeGetDataRequest } from "../../../../features/apiCalls/getdata";

type ContextIdsTemplate = {
  institute: number[];
  department: number[];
  program: number[];
};

const AssignRoles = () => {
  const { userId } = useParams();
  const dummyData = { items: [], pager: { totalElements: 0, totalPages: 0 } };
  const contextIdsTemplate: ContextIdsTemplate = {
    institute: [],
    department: [],
    program: [],
  };
  const [rolesData, setRolesData] = useState<any>(dummyData);
  const [userRoles, setUserRoles] = useState<any>({
    roles: [],
    authorities: [],
  });
  const [assignRoles, setAssignRoles] = useState<any>([]);
  const [userSelectedEmail, setUserSelectedEmail] = useState<any>("");
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE * 10,
  });
  const [apiStatus, setApiStatus] = useState("");
  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );
  const [btnHideStatus, setBtnHideStatus] = useState(false);
  const [institutes, setInstitutes] = useState<any>(dummyData);
  const [departments, setDepartments] = useState<any>(dummyData);
  const [programs, setPrograms] = useState<any>(dummyData);
  const [selectedContextIds, setSelectedContextIds] =
    useState<any>(contextIdsTemplate);

  useEffect(() => {
    makeGetDataRequest(
      `/${currentInstitute}/roles`,
      filterUpdate,
      setRolesData,
      setApiStatus,
      "core-service"
    );
    makeGetDataRequest(
      `/institutes`,
      filterUpdate,
      setInstitutes,
      setApiStatus
    );
    makeGetDataRequest(
      `/${currentInstitute}/departments`,
      filterUpdate,
      setDepartments,
      setApiStatus
    );
    makeGetDataRequest(
      `/${currentInstitute}/programs`,
      filterUpdate,
      setPrograms,
      setApiStatus
    );

    if (userId !== undefined) {
      makeGetDataRequest(
        `/${currentInstitute}/${userId}/user-roles`,
        filterUpdate,
        setUserRoles,
        setApiStatus,
        "core-service"
      );
    } else {
      setUserRoles({ roles: [], authorities: [] });
    }
  }, [userId]);

  useEffect(() => {
    if (rolesData.items.length > 0) {
      const updatedArray = rolesData.items.map((authority: any) => {
        const isPresent = userRoles.roles.find(
          (role: any) => role.id === authority.id
        );
        if (
          authority.contextType !== null &&
          authority.contextType !== "course" &&
          isPresent !== undefined
        ) {
          contextIdsTemplate[authority.contextType].push(
            ...isPresent.contextIds
          );
        }
        return {
          ...authority,
          assigned: isPresent ? true : false,
          contextIds: isPresent ? isPresent.contextIds : [],
        };
      });
      setSelectedContextIds(contextIdsTemplate);
      const removeCourseContexts = updatedArray.filter(
        (el: any) => el.contextType !== "course"
      );
      setAssignRoles(removeCourseContexts);
    }
  }, [rolesData, userRoles]);

  // get programs API call === >>>
  useEffect(() => {
    if (currentInstitute > 0 && userId !== undefined) {
      setApiStatus("started");
      getData(`/${currentInstitute}/users`, {
        pageNumber: 0,
        pageSize: 1,
        userId: userId,
      })
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            if (result.data.items.length === 1) {
              setUserSelectedEmail(result.data.items[0].userEmail);
            }
          }
          setApiStatus("finished");
        })
        .catch((err: any) => {
          console.log(err);
          setApiStatus("finished");
        });
    }
  }, []);

  const getValidateUser = (status: boolean) => {
    setBtnHideStatus(status);
  };

  return (
    <React.Fragment>
      <View
        userId={userId}
        apiStatus={apiStatus}
        assignRoles={assignRoles}
        btnHideStatus={btnHideStatus}
        currentInstitute={currentInstitute}
        userSelectedEmail={userSelectedEmail}
        selectedContextIds={selectedContextIds}
        roleContextDatas={{ institutes, departments, programs }}
        getValidateUser={getValidateUser}
        setUserSelectedEmail={setUserSelectedEmail}
      />
    </React.Fragment>
  );
};

export default AssignRoles;

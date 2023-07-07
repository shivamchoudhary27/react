import React, { useState, useEffect } from "react";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import HeaderTabs from "../../../headerTabs";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";
import PageTitle from "../../../../widgets/pageTitle";
import { Container } from "react-bootstrap";
import Filter from "./filter";
import { useSelector } from "react-redux";
import { pagination } from "../../../../utils/pagination";
import { getData } from "../../../../adapters/coreservices";
import RolesDataRender from "./assignRoles";
import { useParams } from "react-router-dom";
import { makeGetDataRequest } from "../../../../features/api_calls/getdata";

type ContextIdsTemplate = {
  institute: number[];
  department: number[];
  program: number[];
};

const AssignRoles = () => {
  const { userId } = useParams();
  const dummyData = { items: [], pager: { totalElements: 0, totalPages: 0 }};
  const contextIdsTemplate: ContextIdsTemplate = { institute: [], department: [], program: []};
  const [rolesData, setRolesData] = useState<any>(dummyData);
  const [userRoles, setUserRoles] = useState<any>([]);
  const [assignRoles, setAssignRoles] = useState<any>([]);
  const [userSelectedEmail, setUserSelectedEmail] = useState<any>("");
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE * 10,
  });
  const [apiStatus, setApiStatus] = useState("");
  const currentInstitute = useSelector((state: any) => state.currentInstitute);
  const [btnHideStatus, setBtnHideStatus] = useState(false);
  const [institutes, setInstitutes] = useState<any>(dummyData);
  const [departments, setDepartments] = useState<any>(dummyData);
  const [programs, setPrograms] = useState<any>(dummyData);
  const [selectedContextIds, setSelectedContextIds] = useState<any>(contextIdsTemplate);
  
  useEffect(() => {
    makeGetDataRequest(
      `/${currentInstitute}/roles`,
      filterUpdate,
      setRolesData,
      setApiStatus,
      "core-service"
    );
    makeGetDataRequest(`/institutes`, filterUpdate, setInstitutes, setApiStatus);
    makeGetDataRequest(`/${currentInstitute}/departments`, filterUpdate, setDepartments, setApiStatus);
    makeGetDataRequest(`/${currentInstitute}/programs`, filterUpdate, setPrograms, setApiStatus);

    if (userId !== undefined) {
      makeGetDataRequest(
        `/${currentInstitute}/${userId}/user-roles`,
        filterUpdate,
        setUserRoles,
        setApiStatus,
        "core-service"
      );
    } else {
      setUserRoles([]);
    }
  }, [userId]);

  useEffect(() => {
    if (rolesData.items.length > 0) {
      // const packetSet = new Set(
      //   userRoles.map((rolePacket: any) => rolePacket.id)
      // );
      const updatedArray = rolesData.items.map((authority: any) => {
        const isPresent = userRoles.find((role: any) => role.id === authority.id);
        // const isPresent = packetSet.has(authority.id);
        if (authority.contextType !== null && isPresent !== undefined) {
          // contextIdsTemplate[authority.contextType].push(isPresent.id)
          contextIdsTemplate[authority.contextType].push(...isPresent.contextIds);
        }
        return { 
          ...authority, 
          assigned: isPresent ? true : false, 
          contextIds: isPresent ? isPresent.contextIds : []
        };
      });
      setSelectedContextIds(contextIdsTemplate)
      setAssignRoles(updatedArray);
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
    setBtnHideStatus(status)
  }

  return (
    <React.Fragment>
      <Header />
      <HeaderTabs />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "User Management", path: "/usermanagement" },
          { name: "Assign Roles", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle
            pageTitle={`Assign Roles${userSelectedEmail !== "" ? ": " + userSelectedEmail : ""}`}
            gobacklink="/usermanagement"
          />
          <Filter
            userSelectedEmail={userSelectedEmail}
            currentInstitute={currentInstitute}
            setUserSelectedEmail={setUserSelectedEmail}
            getValidateUser={getValidateUser}
          />
          <RolesDataRender
            assignRoles={assignRoles}
            currentInstitute={currentInstitute}
            apiStatus={apiStatus}
            userId={userId}
            btnHideStatus={btnHideStatus}
            roleContextDatas={{institutes, departments, programs}}
            selectedContextIds={selectedContextIds}
          />
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default AssignRoles;

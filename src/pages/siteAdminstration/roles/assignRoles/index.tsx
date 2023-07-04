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
import RolesDataRender from "./rolesDataRender";
import { useParams } from "react-router-dom";

const AssignRoles = () => {
  const { userId } = useParams();
  const dummyData = { items: [], pager: { totalElements: 0, totalPages: 0 } };
  const [rolesData, setRolesData] = useState<any>(dummyData);
  const [userData, setUserData] = useState<any>(dummyData);
  const [refreshData, setRefreshData] = useState(true);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE * 10,
  });
  const [apiStatus, setApiStatus] = useState("");
  const currentInstitute = useSelector((state: any) => state.currentInstitute);
  const [findUserData, setFindUserData] = useState<any>([]);

  // get programs API call === >>>
  useEffect(() => {
    if (currentInstitute > 0) setApiStatus("started");
    getData(`/${currentInstitute}/roles`, filterUpdate)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          if (result.data.items.length < 1) {
          }
          setRolesData(result.data);
        }
        setApiStatus("finished");
      })
      .catch((err: any) => {
        console.log(err);
        setApiStatus("finished");
      });
  }, [refreshData, filterUpdate, currentInstitute]);

  // get programs API call === >>>
  useEffect(() => {
    if (currentInstitute > 0) setApiStatus("started");
    getData(`/${currentInstitute}/users`, filterUpdate)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          if (result.data.items.length < 1) {
          }
          setUserData(result.data);
        }
        setApiStatus("finished");
      })
      .catch((err: any) => {
        console.log(err);
        setApiStatus("finished");
      });
  }, [refreshData, filterUpdate, currentInstitute]);

  useEffect(() => {
    const findData = userData.items.find((elem: any) => (elem.userId === parseInt(userId)));
    if(findData != undefined){
      setFindUserData(findData)
    }
  }, [userId, userData]);

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
            pageTitle="Assign Roles (In progress)"
            gobacklink="/usermanagement"
          />
          <Filter findUserData={findUserData} />
          <RolesDataRender rolesData={rolesData.items} />
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default AssignRoles;

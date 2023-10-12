import { useSelector } from "react-redux";
import WorkLoadComp from "./workLoadComp";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import HeaderTabs from "../../../../headerTabs";
import React, { useEffect, useState } from "react";
import PageTitle from "../../../../../widgets/pageTitle";
import { pagination } from "../../../../../utils/pagination";
import { getData } from "../../../../../adapters/microservices";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";

type Props = {};

const ManageWorkLoad = (props: Props) => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const { userId } = useParams();
  const [workloadData, setWorkloadData] = useState(dummyData);
  const [filterUpdate, setFilterUpdate] = useState({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
    userId: userId
  });
  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );

  useEffect(() => {
    let endPoint = `/${currentInstitute}/timetable/userworkload`;
    if (currentInstitute > 0) {
      getData(endPoint, filterUpdate)
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            setWorkloadData(result.data);
          }
          // setApiStatus("finished");
        })
        .catch((err: any) => {
          console.log(err);
          // setApiStatus("finished");
        });
      }
  }, [userId, filterUpdate, currentInstitute]);

  return (
    <React.Fragment>
      <Header />
      <HeaderTabs />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Timetable Management", path: "/timetable" },
          { name: "Faculty Work Load", path: "/workload" },
          { name: "Manage Faculty Work Load", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle
            pageTitle="Manage Faculty Work Load"
            gobacklink="/workload"
          />
          <WorkLoadComp workloadData={workloadData.items} currentInstitute={currentInstitute} />
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default ManageWorkLoad;

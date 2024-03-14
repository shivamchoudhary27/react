import "./style.scss";
import View from "./view";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getData } from "../../adapters/microservices";

type Props = {};

const MinorCourse = (props: Props) => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [apiStatus, setApiStatus] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [refreshData, setRefreshData] = useState(true);
  const [minorCourseData, setMinorCourseData] = useState<any>(dummyData);
  const [minorcourseObj, setminorcourseObj] = useState({
    id: 0,
    name: "",
    remainingSeats:null,
    enrollmentCapacity: null,
    enrolmentStatus: "enrolment_close"
  });
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: 300,
  });

  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );
  
  // Get minorCourses Data from API === >>
  useEffect(() => {
    setApiStatus("started");
    getData(`/${currentInstitute}/user/minor/courses`, filterUpdate)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          setMinorCourseData(result.data);
        }
        setApiStatus("finished");
      })
      .catch((err: any) => {
        console.log(err);
        setApiStatus("finished");
      });
  }, [currentInstitute, filterUpdate, refreshData]);

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  // get id, name from table === >>>
  const editHandlerById = (
    id: number,
    name: string,
    remainingSeats: number,
    enrollmentCapacity: number,
    enrolmentStatus: string
  ) => {
    setminorcourseObj({
      id: id,
      name: name,
      remainingSeats: remainingSeats,
      enrollmentCapacity: enrollmentCapacity,
      enrolmentStatus: enrolmentStatus
    });
  };

  return (
    <React.Fragment>
      <View
        apiStatus={apiStatus}
        modalShow={modalShow}
        refreshToggle={refreshToggle}
        newPageRequest={newPageRequest}
        minorcourseObj={minorcourseObj}
        editHandlerById={editHandlerById}
        toggleModalShow={toggleModalShow}
        onHide={() => toggleModalShow(false)}
        filterUpdate={filterUpdate.pageNumber}
        minorCourseData={minorCourseData.items}
        totalPages={minorCourseData.pager.totalPages}
      />
    </React.Fragment>
  );
};

export default MinorCourse;

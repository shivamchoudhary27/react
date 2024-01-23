import View from "./view";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getData } from "../../adapters/microservices";
import { pagination } from "../../utils/pagination";

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
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  
  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
    );
  //   1/minorCourses
  useEffect(() => {
    setApiStatus("started");
    getData(`/${currentInstitute}/minorCourses`, filterUpdate)
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
  }, [currentInstitute]);

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

  return (
    <React.Fragment>
      <View
        apiStatus={apiStatus}
        modalShow={modalShow}
        refreshToggle={refreshToggle}
        newPageRequest={newPageRequest}
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

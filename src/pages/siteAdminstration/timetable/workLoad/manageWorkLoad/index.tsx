import View from "./view";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pagination } from "../../../../../utils/pagination";
import { getData } from "../../../../../adapters/microservices";

type Props = {};

const ManageWorkLoad = (props: Props) => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const { userId } = useParams();
  const [workloadData, setWorkloadData] = useState(dummyData);
  const [timeSlotList, setTimeSlotList] = useState<any>([]);
  const [apiStatus, setApiStatus] = useState("");
  const [filterUpdate, setFilterUpdate] = useState({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
    userId: userId,
  });

  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );

  useEffect(() => {
    let endPoint = `/${currentInstitute}/timetable/userworkload`;
    if (currentInstitute > 0) {
      setApiStatus("started");
      getData(endPoint, filterUpdate)
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            setWorkloadData(result.data);
          }
          setApiStatus("finished");
        })
        .catch((err: any) => {
          console.log(err);
          setApiStatus("finished");
        });
    }
  }, [userId, filterUpdate, currentInstitute]);

  useEffect(() => {
    workloadData.items.map((item: any) => {
      if (currentInstitute > 0) {
        let endPoint = `/${currentInstitute}/timetable/timeslot?departmentId=${item.departmentId}`;
        getData(endPoint, filterUpdate)
          .then((result: any) => {
            if (result.data !== "" && result.status === 200) {
              let newItem = result.data.items;
              let filterItem = newItem.filter(
                (slotList: any) => slotList.departmentId === item.departmentId
              );
              let filterObj = {};
              filterObj["dpt_" + item.departmentId] = filterItem;
              setTimeSlotList((prevArray: any) => [...prevArray, filterObj]);
            }
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
    });
  }, [workloadData]);

  return (
    <View
      apiStatus={apiStatus}
      timeSlotList={timeSlotList}
      workloadData={workloadData.items}
      currentInstitute={currentInstitute}
    />
  );
};

export default ManageWorkLoad;

import React, { useEffect, useState } from 'react'
import { getData } from '../../../../adapters/microservices';
import { useParams } from 'react-router-dom';
import { pagination } from '../../../../utils/pagination';
import LevelThreshold2Table from './levelThreshold2';

type Props = {
    setActiveTab: any
}

const LevelThreshold2 = (props: Props) => {
  console.log("inside page 3--------------")
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const { id } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [allCourseOutcome, setAllCourseOutcome] = useState(dummyData);
  const [levelData, setLevelData] = useState(dummyData);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [refreshData, setRefreshData] = useState<boolean>(true);
  const [apiStatus, setApiStatus] = useState("");
  const [outcomeObj, setOutcomeObj] = useState({
    id: 0,
    suffixValue: "",
    target: "",
    description: "",
  });
  const [apiCallTrack, setApiCallTrack] = useState();

  useEffect(() => {
    getData(`/${id}/courseoutcome/level`, filterUpdate)
      .then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setLevelData(res.data);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [props.setActiveTab]);

  console.log(levelData)

  return (
    <div><LevelThreshold2Table levelData={levelData.items} /></div>
  )
}

export default LevelThreshold2
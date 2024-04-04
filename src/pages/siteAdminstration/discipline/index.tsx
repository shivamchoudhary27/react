import "./style.scss";
import View from "./view";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getData } from "../../../adapters/microservices";
import { pagination } from "../../../utils/pagination";
import { Interface_DisciplineCustomObject } from "./type/interface";
import {
  Type_DisciplineDataObject,
  Type_DisciplineFilterUpdate,
  Type_CurrentInstitute,
} from "./type/type";

const Discipline = () => {
  const dummyData: Type_DisciplineDataObject = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [diciplineData, setDiciplineData] =
    useState<Type_DisciplineDataObject>(dummyData);
  const [disciplineObj, setDisciplineObj] =
    useState<Interface_DisciplineCustomObject>({
      id: 0,
      name: "",
      description: "",
      published: false,
    });
  const [refreshData, setRefreshData] = useState<boolean>(true);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [filterUpdate, setFilterUpdate] = useState<Type_DisciplineFilterUpdate>(
    {
      name: "",
      sortBy: "",
      sortOrder: "",
      pageNumber: 0,
      pageSize: pagination.PERPAGE,
    }
  );
  const [apiStatus, setApiStatus] = useState<string>("");
  const currentInstitute: number = useSelector(
    (state: Type_CurrentInstitute) => state.globalFilters.currentInstitute
  );

  const getDisciplineData = (
    endPoint: string,
    filters: any,
    setData: any,
    setApiStatus: (params: string) => void
  ) => {
    setApiStatus("started");
    getData(endPoint, filters)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          // Merge the programCounts into the items objects
          result.data.items.forEach((item: any) => {
            const index = result.data.programCounts.findIndex(
              (packet: any) => packet.disciplineId === item.id
            );
            item.totalPrograms = 0;
            if (index > -1) {
              item.totalPrograms =
                result.data.programCounts[index].totalPrograms;
            }
          });
          setData(result.data);
        }
        setApiStatus("finished");
      })
      .catch((err: any) => {
        console.log(err);
        setApiStatus("finished");
      });
  };

  // get programs API call === >>>
  useEffect(() => {
    if (currentInstitute > 0)
      getDisciplineData(
        `/${currentInstitute}/disciplines`,
        filterUpdate,
        setDiciplineData,
        setApiStatus
      );
  }, [refreshData, filterUpdate, currentInstitute]);

  useEffect(() => {
    if (refreshOnDelete === true && currentInstitute > 0)
      getDisciplineData(
        `/${currentInstitute}/disciplines`,
        filterUpdate,
        setDiciplineData,
        setApiStatus
      );
  }, [refreshOnDelete]);

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  const refreshOnDeleteToggle = (value: boolean) => {
    setRefreshOnDelete(value);
  };

  // get id, name from discipline table === >>>
  const editHandlerById = ({
    ...getEditHandlerValues
  }: Interface_DisciplineCustomObject) => {
    setDisciplineObj({
      id: getEditHandlerValues.id,
      name: getEditHandlerValues.name,
      description: getEditHandlerValues.description,
      published: getEditHandlerValues.published,
    });
  };

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  // handle to open Add Discipline modal === >>>
  const openAddDiscipline = () => {
    toggleModalShow(true);
    setDisciplineObj({ id: 0, name: "", description: "", published: false });
    setRefreshData(false);
  };

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  const updateInputFilters = (inputvalues: any) => {
    setFilterUpdate({ ...filterUpdate, name: inputvalues, pageNumber: 0 });
  };

  return (
    <View
      apiStatus={apiStatus}
      modalShow={modalShow}
      filterUpdate={filterUpdate}
      diciplineData={diciplineData}
      disciplineObj={disciplineObj}
      setFilterUpdate={setFilterUpdate}
      currentInstitute={currentInstitute}
      setModalShow={setModalShow}
      refreshToggle={refreshToggle}
      newPageRequest={newPageRequest}
      toggleModalShow={toggleModalShow}
      editHandlerById={editHandlerById}
      openAddDiscipline={openAddDiscipline}
      updateInputFilters={updateInputFilters}
      refreshOnDeleteToggle={refreshOnDeleteToggle}
    />
  );
};

export default Discipline;

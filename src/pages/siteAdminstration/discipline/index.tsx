import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getData } from "../../../adapters/microservices";
import { pagination } from "../../../utils/pagination";
import "./style.scss";
import {
  Type_DisciplineDataObject,
  Type_DisciplineCustomObject,
  Type_DisciplineFilterUpdate,
  Type_CurrentInstitute,
} from "./types/interface";
import View from "./view";

const Discipline = () => {
  const dummyData: Type_DisciplineDataObject = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [diciplineData, setDiciplineData] = useState<Type_DisciplineDataObject>(dummyData);
  const [disciplineObj, setDisciplineObj] = useState<Type_DisciplineCustomObject>({
    id: 0,
    name: "",
    description: "",
    published: false,
  });
  const [refreshData, setRefreshData] = useState<boolean>(true);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [filterUpdate, setFilterUpdate] = useState<Type_DisciplineFilterUpdate>({
    name: "",
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
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
  const editHandlerById = ({...getEditHandlerValues}: Type_DisciplineCustomObject) => {
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
    <React.Fragment>
      <View
        diciplineData={diciplineData}
        filterUpdate={filterUpdate}
        openAddDiscipline={openAddDiscipline}
        updateInputFilters={updateInputFilters}
        editHandlerById={editHandlerById}
        toggleModalShow={toggleModalShow}
        refreshToggle={refreshToggle}
        refreshOnDeleteToggle={refreshOnDeleteToggle}
        apiStatus={apiStatus}
        currentInstitute={currentInstitute}
        modalShow={modalShow}
        disciplineObj={disciplineObj}
        newPageRequest={newPageRequest}
        setModalShow={setModalShow} />
    </React.Fragment>
  );
};

export default Discipline;

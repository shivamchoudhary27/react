export type Type_InitialValues = {
  name: string;
  description: string;
  published: boolean;
}

export type Type_DisciplineDataObject = {
  items: [];
  pager: { totalElements: number; totalPages: number };
};

export type Type_DisciplineFilterUpdate = {
  name: string;
  pageNumber: number;
  pageSize: number;
}


export interface Type_CurrentInstitute {
  globalFilters: any;
  currentDepartmentFilterId: number | string;
  currentInstitute: number;
  mitGlobalAlert: { hideShow: boolean; msg: string };
}

export interface Type_AlertMsg {
  message: string;
  alertBoxColor: string;
}

export interface IDiciplineTable {
  diciplineData: any;
  editHandlerById: any;
  toggleModalShow: any
  refreshDisciplineData: () => void;
  refreshOnDelete: (params: boolean) => void;
  apiStatus: string;
  currentInstitute: number;
  disciplinePermissions: any;
}

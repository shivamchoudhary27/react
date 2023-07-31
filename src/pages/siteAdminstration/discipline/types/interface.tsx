export interface IInitialValues {
  name: string;
  description: string;
  published: boolean;
}

export interface IDummyData {
  items: [];
  pager: { totalElements: number; totalPages: number };
}

export interface IDisciplineObj {
  id: number;
  name: string;
  description: string;
  published: boolean;
}

export interface IFilterUpdate {
  name: string;
  pageNumber: number;
  pageSize: number;
}

export interface ICurrentInstitute {
  currentDepartmentFilterId: number | string;
  currentInstitute: number;
  mitGlobalAlert: { hideShow: boolean; msg: string };
}

export interface IDisciplineModal {
  disciplineobj: IDisciplineObj;
  togglemodalshow: (params: boolean) => void;
  refreshDisciplineData: () => void;
  show: boolean;
  onHide: () => void;
  currentInstitute: number;
}

export interface IAlertMsg {
  message: string;
  alertBoxColor: string;
}

export interface IDiciplineTable {
  diciplineData: any;
  editHandlerById: IDisciplineObj;
  toggleModalShow: (params: boolean) => void;
  refreshDisciplineData: () => void;
  refreshOnDelete: (params: boolean) => void;
  apiStatus: string;
  currentInstitute: number;
  disciplinePermissions: any;
}

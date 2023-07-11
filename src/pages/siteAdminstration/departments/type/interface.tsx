export interface IDepartmentObj {
  id: number;
  name: string;
  published: boolean;
}

export interface ICurrentInstitute {
  currentDepartmentFilterId: number | string;
  currentInstitute: number;
  mitGlobalAlert: { hideShow: boolean; msg: string };
}

export interface IFilter {
  toggleModalShow: (params: boolean) => void;
  resetDepartmentForm: () => void;
  updateInputFilters: (params: any) => void;
}

export interface IFilterUpdate {
  departmentId: string;
  name: string;
  pageNumber: number;
  pageSize: number;
}

export interface IAlertMsg {
  message: string;
  alertBoxColor: string;
}

export interface IDepartmentModal {
  departmentobj: IDepartmentObj;
  togglemodalshow: (params: boolean) => void;
  refreshdepartmentdata: () => void;
  show: boolean;
  onHide: () => void;
  currentInstitute: number;
}

export interface IDepartmentTable {
  departmentData: any;
  editHandlerById: any;
  toggleModalShow: (param: boolean) => void;
  refreshDepartmentData: () => void;
  refreshOnDelete: (param: boolean) => void;
  apiStatus: string;
  currentInstitute: number;
}

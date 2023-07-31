export interface IDummyData {
  items: [];
  pager: { totalElements: number; totalPages: number };
}

export interface IFilterUpdate {
  name?: string;
  departmentId?: string;
  pageNumber: number;
  pageSize: number;
}

export interface ICurrentInstitute {
  currentDepartmentFilterId: number | string;
  currentInstitute: number;
  mitGlobalAlert: { hideShow: boolean; msg: string };
}

export interface IProgramTypeObj {
  id: number;
  name: string;
  description: string;
  batchYearRequired: boolean;
  published: boolean;
}

export interface IAlertMsg {
  message: string;
  alertBoxColor: string;
}

export interface IProgramTable {
  programTypeData: any;
  editHandlerById: IProgramTypeObj;
  toggleModalShow: (params: boolean) => void;
  refreshProgramData: () => void;
  refreshOnDelete: (params: boolean) => void;
  apiStatus: string;
  currentInstitute: number;
  programtypePermissions: any;
}

export interface IProgramtypePacket {
  createdTime: string;
  description: string;
  id: number;
  isBatchYearRequired: boolean;
  lastModifiedTime: string;
  name: string;
  published: boolean;
  totalPrograms: number;
}

export interface IAddProgramModal {
  programtypeobj: IProgramTypeObj;
  togglemodalshow: (params: boolean) => void;
  refreshprogramdata: () => void;
  show: boolean;
  onHide: () => void;
  currentInstitute: number;
}

export interface IFilter {
  openAddProgramType: () => void;
  updateinputfilters: (params: string) => void;
  programtypePermissions: any;
}

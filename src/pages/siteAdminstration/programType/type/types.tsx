export type Type_ApiResponse = {
  items: [];
  pager: { totalElements: number; totalPages: number };
};

export type Type_ProgramTypeObject = {
  id: number;
  name: string;
  published: boolean;
  description: string;
  batchYearRequired: boolean;
};

export type Type_FormTitles = {
  btnTitle: string;
  titleHeading: string;
};

export type Type_FilterUpdate = {
  name?: string;
  pageSize: number;
  pageNumber: number;
  departmentId?: string;
};

export interface ICurrentInstitute {
  globalFilters: any;
  currentInstitute: number;
  currentDepartmentFilterId: number | string;
  mitGlobalAlert: { hideShow: boolean; msg: string };
}

export interface Type_AlertMsg {
  message: string;
  alertBoxColor: string;
}

export interface Type_ProgramtypePacket {
  id: number;
  name: string;
  published: boolean;
  description: string;
  createdTime: string;
  totalPrograms: number;
  lastModifiedTime: string;
  isBatchYearRequired: boolean;
}

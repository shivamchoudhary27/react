interface IItems {
  id: number;
  name: string;
  contextType?: string;
  description?: string;
}

export interface IUserData {
  items: IItems[];
  pager: { totalElements: number; totalPages: number };
}

export interface IUserObj {
  id: number;
  name: string;
  description: string;
  contextType: string;
  published: boolean;
}

export interface IFilterUpdate {
  pageNumber: number;
  pageSize: number;
}

export interface ICurrentInstitute {
  currentDepartmentFilterId: number | string;
  currentInstitute: number;
  mitGlobalAlert: { hideShow: boolean; msg: string };
}

export interface IAlertMsg {
  message: string;
  alertBoxColor: string;
}

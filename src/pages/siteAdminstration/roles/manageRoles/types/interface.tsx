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

export interface IFilter {
  updateSearchFilters: (params: { name: string }, params2?: boolean) => void;
  toggleModalShow: (params: boolean) => void;
  openAddRoleModal: () => void;
}

export interface IRoleTable {
  userData: any;
  refreshOnDeleteToggle: (params: boolean) => void;
  currentInstitute: number;
  apiStatus: string;
  editHandlerById: IUserObj;
  setAddRoleModalShow: (params: boolean) => void;
  getRoleId: any;
}

export type TypeModalShow = boolean;
export type TypeRefreshOnDelete = boolean;
export type TypeRefreshData = boolean;
export type TypeApiStatus = string;
export type TypeEndPoint = string;
export type TypeShowAlert = boolean;
export type CurrentInstitute = number;

export type TypeDummyData = {
  items: any[];
  pager: { totalElements: number; totalPages: number };
}

export type TypeFormTitles = {
  titleHeading: string;
  btnTitle: string;
  description: string;
};

export type TypeDepartmentObj = {
  id: number;
  name: string;
  published: boolean;
};

export type TypeCurrentInstitute = {
  currentDepartmentFilterId: number | string;
  currentInstitute: number;
  mitGlobalAlert: { hideShow: boolean; msg: string };
};

export type TypeFilter = {
  toggleModalShow: (params: boolean) => void;
  resetDepartmentForm: (params: boolean | null) => void;
  updateInputFilters: (params: any) => void;
  refreshDepartmentData?: () => void;
};

export type TypeFilterUpdate = {
  departmentId: string;
  name: string;
  pageNumber: number;
  pageSize: number;
};

export type TypeAlertMsg = {
  message: string;
  alertBoxColor: string;
};

export type TypeDepartmentModal = {
  departmentobj: TypeDepartmentObj;
  togglemodalshow: (params: boolean) => void;
  refreshdepartmentdata: () => void;
  show: boolean;
  onHide: () => void;
  currentInstitute: number;
};

export type TypeDepartmentTable = {
    departmentData: any;
    editHandlerById: any;
    toggleModalShow: (param: boolean) => void;
    refreshDepartmentData: () => void;
    refreshOnDelete: (param: boolean) => void;
    apiStatus: string;
    currentInstitute: number;
  }

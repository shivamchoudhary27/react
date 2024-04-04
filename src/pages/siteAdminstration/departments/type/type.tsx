
export type Type_ApiResponse = {
  items: any[];
  pager: { totalElements: number; totalPages: number };
};

export type Type_FormTitles = {
  btnTitle: string;
  description: string;
  titleHeading: string;
};

export type Type_DepartmentObj = {
  id: number;
  name: string;
  published: boolean;
};

export type TypeCurrentInstitute = {
  globalFilters: any;
  currentInstitute: number;
  currentDepartmentFilterId: number | string;
  mitGlobalAlert: { hideShow: boolean; msg: string };
};

export type Type_FilterUpdate = {
  name: string;
  pageSize: number;
  pageNumber: number;
  departmentId: string;
  sortBy: any,
  sortOrder: any,
};

export type Type_AlertMsg = {
  message: string;
  alertBoxColor: string;
};

export type TypeDepartmentModal = {
  show: boolean;
  currentInstitute: number;
  departmentobj: Type_DepartmentObj;
  onHide: () => void;
  refreshdepartmentdata: () => void;
  togglemodalshow: (params: boolean) => void;
};


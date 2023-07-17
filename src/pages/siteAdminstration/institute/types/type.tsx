export type TypeModalShow = boolean;
export type TypeUploadModalShow = boolean;
export type TypeApiStatus = string;

export type TypeDummyData = {
  items: any[];
  pager: { totalElements: number; totalPages: number };
};

export type TypeUserObj = {
  id: number;
  name: string;
  userEmail: string;
  shortCode: string;
  instanceUrl: string;
  webServiceToken: string;
  locked: string;
};

export type TypeFilteUpdate = {
  pageNumber: number;
  pageSize: number;
};

export type TypeFilter = {
  updatefilters: (params: any, params2?: boolean) => void;
  toggleUploadModal: () => void;
  openAddUserModal: () => void;
};

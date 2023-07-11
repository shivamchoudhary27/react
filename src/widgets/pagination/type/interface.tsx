export interface IBuildPagination {
  totalpages: number;
  activepage: number;
  getrequestedpage: (params: number) => void;
}

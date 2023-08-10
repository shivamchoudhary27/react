import { Type_InitialValues } from "./type";

export interface Interface_DisciplineCustomObject extends Type_InitialValues {
    id: number;
}

export interface Interface_DisciplineModal {
    disciplineobj: Interface_DisciplineCustomObject;
    togglemodalshow: (params: boolean) => void;
    refreshDisciplineData: () => void;
    show: boolean;
    onHide: () => void;
    currentInstitute: number;
}

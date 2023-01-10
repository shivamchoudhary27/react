import { ReactNode } from "react";
// ===============================================
        //Catalogue page === >>>
// ===============================================
export interface TokenType {
  token: any;
}

export interface ContextType {
  children: ReactNode;
  userid: number;
  fullname: string;
}

export interface CategoriesType {
  id: number;
  name: string;
  coursecount: number;
}

export interface FilterdCoursesType {
  id: number;
  fullname: string;
  timemodified: number,
  length : 0 | 1
}

export interface CounterValueType{
    counter: number,
    status: boolean
    counterCourseId: counterCourseId
}

interface counterCourseId{
    status: boolean,
    data: number
}

export interface CoursecataloguecardType{
  courseName: string,
  courseId: number,
  cartCounter: any,
  counterCourseId: any,
  courseTime: number,
  courseIdStore: any[]
}

export interface VideoLinkType{
  videoId: number,
  videoUrl: string,
  videoName: string
}

export interface QuizLinkType{
  quizId: number,
  quizName: string,
  quizInstance: number
}

export interface LinkToggleType{
  linkToggle: number
}

export interface MyCoursesType{
  startdate: number,
  enddate: number
}

export interface FilterType{
  id: number,
  enddate: number,
  startdate: number,
  fullname: string,
  summary: string,
  overviewfiles: any,
  progress: number,
  completed: boolean,
}

// ===============================================
                // Pagination === >>>
// ===============================================
export interface CataloguePaginationType{
  start: number,
  end: number
}

export interface PaginationType{
  showPerPage: number,
  onPaginationChange: any,
  filterdLength: number
}

// ===============================================
      // Dashboard mycourse component === >>>
// ===============================================
export interface MyCourseCardType{
  currentTab: any;
  element: [],
  mycoursedata: elementArray
}

interface elementArray{
  id: number,
  enddate: number,
  startdate: number,
  fullname: string,
  summary: string,
  overviewfiles: any,
  progress: number,
  completed: boolean,
}

// ===============================================
      // Dashboard catalogue component === >>>
// ===============================================
export interface DashCatalogType{
  key: number,
  id: number,
  name: string,
  coursecount:number,
  parent: number,
}

export interface CatalogCardType{
  catName: string,
  courseCount: number
}

// ===============================================
    // Dashboard recommended component === >>>
// ===============================================
export interface DashRecCourseType{
  status: number,
  data: data[]
}
interface data{
  id: number,
  length: number
}

export interface RecCardType{
  recourse: recourse
}
interface recourse{
  startdate: number,
  fullname: string,
  summary: string
}

// ===============================================
              // Cart page == >>>
// ===============================================
// export interface CartType{
//   id: number,
//   fullname: string
// }

// ===============================================
            // ForgotPassword == >>>
// ===============================================
export interface ForgotPasswordType{
  status: boolean,
  success: boolean,
  msg: string
}

/// attempt
export interface UserAnswerObject {
  value: any;
  name: string;
}

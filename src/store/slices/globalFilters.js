import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentInstitute : localStorage.getItem("institute") ? parseInt(localStorage.getItem("institute")) : 0,  
    currentDepartmentFilterId : "",
    currentUserRole : localStorage.getItem("currentUserRole") ? parseInt(localStorage.getItem("currentUserRole")) : 0,
}

const globalFilterSlice = createSlice({
    name: 'globalFilters',
    initialState,
    reducers: {
        currentInstitute (state, action) {
            state.currentInstitute = action.payload
        },
        currentDepartment (state, action) {
            state.currentDepartmentFilterId = action.payload
        },
        currentUserRole (state, action) {
            state.currentUserRole = action.payload
        }
    }
})

export const globalFilterActions = globalFilterSlice.actions

export default globalFilterSlice;
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentInstitute : localStorage.getItem("institute") ? parseInt(localStorage.getItem("institute")) : 0,  
    currentDepartmentFilterId : "",
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
    }
})

export const globalFilterActions = globalFilterSlice.actions

export default globalFilterSlice;
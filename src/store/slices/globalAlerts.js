import { createSlice } from "@reduxjs/toolkit"

const initialState = {mitGlobalAlert : { msg: "", hideShow: false }}

const globalAlertSlice = createSlice({
    name: 'globalAlert',
    initialState,
    reducers: {
        globalAlert (state, action) {
            state.mitGlobalAlert = { msg: action.payload.alertMsg, hideShow: action.payload.status }
        }
    }
})

export const globalAlertActions = globalAlertSlice.actions

export default globalAlertSlice;

import { createSlice } from "@reduxjs/toolkit"

const updateEntityPermissions = (permissionNames, authorities) => {
    return {
        canView: authorities.includes(permissionNames?.view),
        canAdd: authorities.includes(permissionNames?.add),
        canEdit: authorities.includes(permissionNames?.edit),
        canDelete: authorities.includes(permissionNames?.remove), 
    }
}

const getAuthorities = localStorage.getItem("userAuthorities") ? JSON.parse(localStorage.getItem("userAuthorities")) : [];

const initialState = {
    authorities: getAuthorities,
    permissions: {
        user: updateEntityPermissions(
            {view: "VIEW_USER", add:"CREATE_USER", edit:"UPDATE_USER", remove:"DELETE_USER"},
            getAuthorities
        ),
        program: updateEntityPermissions(
            {view: "VIEW_PROGRAM", add:"CREATE_PROGRAM", edit:"UPDATE_PROGRAM", remove:"DELETE_PROGRAM"},
            getAuthorities
        ),
    }
}

const userAuthoritiesSlice = createSlice({
    name: 'authorities',
    initialState,
    reducers: {
        updateUserAuthorities (state, action) {
            state.authorities = action.payload;
            const userPermissions = updateEntityPermissions(
                {view: "VIEW_USER", add:"CREATE_USER", edit:"UPDATE_USER", remove:"DELETE_USER"},
                action.payload
            );
            state.permissions.user = userPermissions;
        },
    }
})

export const userAuthoritiesActions = userAuthoritiesSlice.actions

export default userAuthoritiesSlice;
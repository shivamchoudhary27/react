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
        discipline: updateEntityPermissions(
            {view: "VIEW_DISCIPLINE", add:"CREATE_DISCIPLINE", edit:"UPDATE_DISCIPLINE", remove:"DELETE_DISCIPLINE"},
            getAuthorities
        ),
        programtype: updateEntityPermissions(
            {view: "VIEW_PROGRAM_TYPE", add:"CREATE_PROGRAM_TYPE", edit:"UPDATE_PROGRAM_TYPE", remove:"DELETE_PROGRAM_TYPE"},
            getAuthorities
        ),
        tag: updateEntityPermissions(
            {view: "VIEW_TAG", add:"CREATE_TAG", edit:"UPDATE_TAG", remove:"DELETE_TAG"},
            getAuthorities
        ),
        group: updateEntityPermissions(
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
            console.log(action.payload)
            state.authorities = action.payload;
            const userPermissions = updateEntityPermissions(
                {view: "VIEW_USER", add:"CREATE_USER", edit:"UPDATE_USER", remove:"DELETE_USER"},
                action.payload
            );
            const programPermissions = updateEntityPermissions(
                {view: "VIEW_PROGRAM", add:"CREATE_PROGRAM", edit:"UPDATE_PROGRAM", remove:"DELETE_PROGRAM"},
                action.payload
            );
            const disciplinePermissions = updateEntityPermissions(
                {view: "VIEW_DISCIPLINE", add:"CREATE_DISCIPLINE", edit:"UPDATE_DISCIPLINE", remove:"DELETE_DISCIPLINE"},
                action.payload
            );
            const programtypePermissions = updateEntityPermissions(
                {view: "VIEW_PROGRAM_TYPE", add:"CREATE_PROGRAM_TYPE", edit:"UPDATE_PROGRAM_TYPE", remove:"DELETE_PROGRAM_TYPE"},
                action.payload
            );
            const tagPermissions = updateEntityPermissions(
                {view: "VIEW_TAG", add:"CREATE_TAG", edit:"UPDATE_TAG", remove:"DELETE_TAG"},
                action.payload
            );
            const groupPermissions = updateEntityPermissions(
                {view: "VIEW_GROUP", add:"CREATE_GROUP", edit:"UPDATE_GROUP", remove:"DELETE_GROUP"},
                action.payload
            );
            state.permissions.user = userPermissions;
            state.permissions.program = programPermissions;
            state.permissions.discipline = disciplinePermissions;
            state.permissions.programtype = programtypePermissions;
            state.permissions.tag = tagPermissions;
            state.permissions.group = groupPermissions;
        },
    }
})

export const userAuthoritiesActions = userAuthoritiesSlice.actions

export default userAuthoritiesSlice;
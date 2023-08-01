import { createSlice } from "@reduxjs/toolkit";

const permissionsList = {
    user: {view: "VIEW_USER", add:"CREATE_USER", edit:"UPDATE_USER", remove:"DELETE_USER", upload: "BULK_UPLOAD_USER"},
    institute: {view: "VIEW_INSTITUTE", add:"CREATE_INSTITUTE", edit:"UPDATE_INSTITUTE", remove:"DELETE_INSTITUTE"},
    department: {view: "VIEW_DEPARTMENT", add:"CREATE_DEPARTMENT", edit:"UPDATE_DEPARTMENT", remove:"DELETE_DEPARTMENT"},
    program: {view: "VIEW_PROGRAM", add:"CREATE_PROGRAM", edit:"UPDATE_PROGRAM", remove:"DELETE_PROGRAM"},
    category: {view: "VIEW_CATEGORY", add:"CREATE_CATEGORY", edit:"UPDATE_CATEGORY", remove:"DELETE_CATEGORY"},
    course: {view: "VIEW_COURSE", add:"CREATE_COURSE", edit:"UPDATE_COURSE", remove:"DELETE_COURSE"},
    discipline: {view: "VIEW_DISCIPLINE", add:"CREATE_DISCIPLINE", edit:"UPDATE_DISCIPLINE", remove:"DELETE_DISCIPLINE"},
    programtype: {view: "VIEW_PROGRAM_TYPE", add:"CREATE_PROGRAM_TYPE", edit:"UPDATE_PROGRAM_TYPE", remove:"DELETE_PROGRAM_TYPE"},
    tag: {view: "VIEW_TAG", add:"CREATE_TAG", edit:"UPDATE_TAG", remove:"DELETE_TAG"},
    group: {view: "VIEW_GROUP", add:"CREATE_GROUP", edit:"UPDATE_GROUP", remove:"DELETE_GROUP"},
    role: {view: "VIEW_ROLE", add:"CREATE_ROLE", edit:"UPDATE_ROLE", remove:"DELETE_ROLE", assignRole: "ASSIGN_USER_ROLE", updateAuthority: "UPDATE_ROLE_AUTHORITY"},
    enrolment: {
        program: {view: "VIEW_PROGRAM_ENROL", add:"CREATE_PROGRAM_ENROL", edit:"UPDATE_PROGRAM_ENROL", remove:"REMOVE_PROGRAM_ENROL", bulkEnrol: "BULK_PROGRAM_ENROL"},
        course: {view: "VIEW_COURSE_ENROL", add:"CREATE_COURSE_ENROL", edit:"UPDATE_COURSE_ENROL", remove:"REMOVE_COURSE_ENROL", bulkEnrol: "BULK_COURSE_ENROL"},
    }
};

const updateEntityPermissions = (permissionNames, authorities, component = '') => {
    const permissions = {
        canView: authorities.includes(permissionNames.view),
        canAdd: authorities.includes(permissionNames.add),
        canEdit: authorities.includes(permissionNames.edit),
        canDelete: authorities.includes(permissionNames.remove), 
    }

    if (component === 'user') {
        permissions.canUpload = authorities.includes(permissionNames.upload);
    } else if (component === 'role') {
        permissions.canAssignRole = authorities.includes(permissionNames.assignRole);
        permissions.canUpdateAuthority = authorities.includes(permissionNames.updateAuthority);
    } else if (component === 'program_enrol' || component === 'course_enrol') {
        permissions.canBulkEnrol = authorities.includes(permissionNames.bulkEnrol);
    }
  
    return permissions;
};

const getAllowedPermission = (currentAuthorities) => {
    return {
        user: updateEntityPermissions(permissionsList.user, currentAuthorities, 'user'),
        institute: updateEntityPermissions(permissionsList.institute, currentAuthorities),
        department: updateEntityPermissions(permissionsList.department, currentAuthorities),
        program: updateEntityPermissions(permissionsList.program, currentAuthorities),
        category: updateEntityPermissions(permissionsList.category, currentAuthorities),
        course: updateEntityPermissions(permissionsList.course, currentAuthorities),
        discipline: updateEntityPermissions(permissionsList.discipline, currentAuthorities),
        programtype: updateEntityPermissions(permissionsList.programtype, currentAuthorities),
        tag: updateEntityPermissions(permissionsList.tag, currentAuthorities),
        group: updateEntityPermissions(permissionsList.group, currentAuthorities),
        role: updateEntityPermissions(permissionsList.role, currentAuthorities, 'role'),
        enrolment: {
            program: updateEntityPermissions(permissionsList.enrolment.program, currentAuthorities, 'program_enrol'),
            course: updateEntityPermissions(permissionsList.enrolment.course, currentAuthorities, 'course_enrol'),
        }
    }
}

const getAuthorities = localStorage.getItem("userAuthorities") ? JSON.parse(localStorage.getItem("userAuthorities")) : [];

const initialState = {
    authorities: getAuthorities,
    permissions: getAllowedPermission(getAuthorities)
}

const userAuthoritiesSlice = createSlice({
    name: 'authorities',
    initialState,
    reducers: {
        updateUserAuthorities (state, action) {
            state.authorities = action.payload;
            state.permissions =  getAllowedPermission(action.payload);
        },
    }
})

export const userAuthoritiesActions = userAuthoritiesSlice.actions

export default userAuthoritiesSlice;
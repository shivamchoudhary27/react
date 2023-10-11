import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : {
  userProfile:{
    roles: [],
    files: [],
    userId: 0,
    mobile: "",
    userEmail: "",
    fatherName: "",
    motherName: "",
    bloodGroup: "",
    genderType: "",
    enabled: false,
    userCountry: "",
    parentEmail: "",
    dateOfBirth: "",
    userLastName: "",
    parentsMobile: "",
    userFirstName: "",
  },
};

const globalUserProfile = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    userProfile(state, action) {
      state.userProfile = {
        userId: action.payload?.userId,
        mobile: action.payload?.mobile,
        enabled: action.payload?.enabled,
        userEmail: action.payload?.userEmail,
        bloodGroup: action.payload?.bloodGroup,
        genderType: action.payload?.genderType,
        fatherName: action.payload?.fatherName,
        motherName: action.payload?.motherName,
        userCountry: action.payload?.userCountry,
        dateOfBirth: action.payload?.dateOfBirth,
        parentEmail: action.payload?.parentEmail,
        userLastName: action.payload?.userLastName,
        userFirstName: action.payload?.userFirstName,
        parentsMobile: action.payload?.parentsMobile,
      };
    },
  },
});

export const globalUserProfileActions = globalUserProfile.actions;

export default globalUserProfile;

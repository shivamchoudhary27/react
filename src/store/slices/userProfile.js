import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {
  userProfile:{
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userId: 0,
    userCountry: "",
    enabled: false,
    fatherName: "",
    motherName: "",
    parentEmail: "",
    bloodGroup: "",
    genderType: "",
    dateOfBirth: "",
    roles: [],
    files: [],
  },
};

const globalUserProfile = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    userInfo(state, action) {
      state.userProfile = {
        userFirstName: action.payload.userFirstName,
        userLastName: action.payload.userLastName,
        userEmail: action.payload.userEmail,
        userId: action.payload.userId,
        userCountry: action.payload.userCountry,
        enabled: action.payload.enabled,
        fatherName: action.payload.fatherName,
        motherName: action.payload.motherName,
        parentEmail: action.payload.parentEmail,
        bloodGroup: action.payload.bloodGroup,
        genderType: action.payload.genderType,
        dateOfBirth: action.payload.dateOfBirth,
      };
    },
  },
});

export const globalUserProfileActions = globalUserProfile.actions;

export default globalUserProfile;

import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {
  userInfo:{
      email: "",
      first_name: "",
      institutes: [],
      last_name: "",
      roles: {},
      username: "",
      uid: 0,
      files: []
  },
};

const globalUserInfo = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    userInfo(state, action) {
      state.userInfo = {
        email: action.payload.email,
        first_name: action.payload.first_name,
        institutes: action.payload.institutes,
        last_name: action.payload.last_name,
        roles: action.payload.roles,
        username: action.payload.username,
        uid: action.payload.uid,
        files: action.payload.files,
      };
    },
    removeUserPicture (state) {
      state.userInfo.files = [];
    },
    updateUserPicture (state, action) {
      state.userInfo.files = action.payload;
    }
  },
});

export const globalUserInfoActions = globalUserInfo.actions;

export default globalUserInfo;

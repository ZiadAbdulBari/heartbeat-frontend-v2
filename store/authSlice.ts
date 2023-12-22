import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedin: false,
    token: "",
    role: "",
    user_id: "",
  },
  reducers: {
    getLoggedinStatus: (state) => {
      let status = window.localStorage.getItem("isLoggedin");
      let token = window.localStorage.getItem("token");
      let role = window.localStorage.getItem("role");
      let user_id = window.localStorage.getItem("user_id");
    state.isLoggedin = status == null || status=='false' ? false : JSON.parse(status);
    state.token = token == null || token == "" ? '' : JSON.parse(token);
    state.role = role == null || role == "" ? '' : JSON.parse(role);
    state.user_id = user_id == null || user_id == "" ? '' : JSON.parse(user_id);
    },
  },
});
export const { getLoggedinStatus } = authSlice.actions;
export default authSlice.reducer;

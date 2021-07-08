import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { name: "", email: "", token: "" },
  reducers: {
    logInAction: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logOutAction: (state) => {
      state.email = "";
      state.name = "";
      state.token = "";
    },
  },
});
export const { logInAction, logOutAction } = userSlice.actions;
export default userSlice.reducer;

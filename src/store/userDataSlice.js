import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  userName: "",
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    updateUserData(state, action) {
      const { userId, userName } = action.payload;
      return { ...state, userId, userName };
    },
  },
});

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  userEmail: "",
  userAddress: "",
  userCity: "",
  userState: "",
  zipCode: "",
  nameOnCard: "",
  creditCardNumber: "",
  expirationMonth: "",
  expirationYear: "",
  CVV: "",
};

export const userOrderDataSlice = createSlice({
  name: "userOrderData",
  initialState,
  reducers: {
    updateUserOrderData(state, action) {
      const {
        userName,
        userEmail,
        userAddress,
        userCity,
        userState,
        zipCode,
        nameOnCard,
        creditCardNumber,
        expirationMonth,
        expirationYear,
        CVV,
      } = action.payload;

      return {
        ...state,
        userName,
        userEmail,
        userAddress,
        userCity,
        userState,
        zipCode,
        nameOnCard,
        creditCardNumber,
        expirationMonth,
        expirationYear,
        CVV,
      };
    },
  },
});

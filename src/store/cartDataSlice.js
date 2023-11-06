import { createSlice } from "@reduxjs/toolkit";

const initialState = { cart: [], totalQuantity: 0 };

export const cartDataSlice = createSlice({
  name: "cartData",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const item = action.payload;
      const isItemExistingInCart = state.cart.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      if (isItemExistingInCart === -1) {
        state.cart.push(item);
      } else {
        state.cart.forEach((cartItem, index) => {
          if (index === isItemExistingInCart) {
            cartItem.quantity++;
          }
        });
      }
      state.totalQuantity++;
    },
    increaseCartItemQuantity(state, { payload }) {
      const itemId = payload.id;
      const itemIdx = state.cart.findIndex(
        (cartItem) => cartItem.id === itemId
      );
      state.cart.forEach((cartItem, index) => {
        if (index === itemIdx) {
          cartItem.quantity++;
        }
      });
      state.totalQuantity++;
    },
    decreaseCartItemQuantity(state, { payload }) {
      const itemId = payload.id;
      const itemIdx = state.cart.findIndex(
        (cartItem) => cartItem.id === itemId
      );
      if (state.cart[itemIdx].quantity === 1) {
        state.cart = state.cart.filter((cartItem) => cartItem.id !== itemId);
      } else {
        state.cart.forEach((cartItem, index) => {
          if (index === itemIdx) {
            cartItem.quantity--;
          }
        });
      }
      state.totalQuantity--;
    },
    removeItemFromCart(state, { payload }) {
      const itemId = payload.id;
      const itemIdx = state.cart.findIndex(
        (cartItem) => cartItem.id === itemId
      );
      state.totalQuantity = state.totalQuantity - state.cart[itemIdx].quantity;
      state.cart = state.cart.filter((cartItem) => cartItem.id !== itemId);
    },
    emptyCartAfterCheckout(state) {
      state.cart = [];
      state.totalQuantity = 0;
    },
  },
});

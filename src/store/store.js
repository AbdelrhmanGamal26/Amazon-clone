import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, PERSIST } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { userDataSlice } from "./userDataSlice";
import { userOrderDataSlice } from "./userOrderDataSlice";
import { cartDataSlice } from "./cartDataSlice";

const userDataReducer = combineReducers({
  userData: userDataSlice.reducer,
  cartData: cartDataSlice.reducer,
  userOrderData: userOrderDataSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userData", "cartData", "userOrderData"],
};

const persistedReducer = persistReducer(persistConfig, userDataReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    });
  },
});

export const persistor = persistStore(store);

export const userDataActions = userDataSlice.actions;
export const userOrderDataActions = userOrderDataSlice.actions;
export const cartDataActions = cartDataSlice.actions;

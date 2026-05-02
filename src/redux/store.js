import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/auth";
import messageReducer from "./slices/message";
import balanceReducer from "./slices/balance";
import profileReducer from "./slices/profile";
import serviceReducer from "./slices/service";
import bannerReducer from "./slices/banner";
import transactionHistoryReducer from "./slices/transaction";

const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    profile: profileReducer,
    service: serviceReducer,
    balance: balanceReducer,
    banner: bannerReducer,
    transactionHistory: transactionHistoryReducer,
  },
  devTools: true,
});

export default store;

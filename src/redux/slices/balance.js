import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../services/authService";

export const balanceSlice = createAsyncThunk(
  "balance",
  async (token, thunkAPI) => {
    try {
      const result = await AuthService.balance(token);
      return { balance: result.data.balance };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {};

const userBalanceSlice = createSlice({
  name: "balance",
  initialState,
  extraReducers: {
    [balanceSlice.fulfilled]: (state, action) => {
      state.balance = action.payload.balance;
    },
    [balanceSlice.rejected]: (state, action) => {
      state.balance = null;
    },
  },
});

const { reducer } = userBalanceSlice;
export default reducer;

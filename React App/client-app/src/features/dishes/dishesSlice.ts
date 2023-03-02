import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDishes = createAsyncThunk("dishes/fetchDishes", async () => {
  const response = await axios.get("http://localhost:8000/dishes");
  return response.data;
});

export const dishesSlice = createSlice({
  name: "dishes",
  initialState: {
    data: [],
    status: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchDishes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default dishesSlice.reducer;

import { createSlice, current } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "colorsSlice",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setIsLoading: (state, action) => {
      const { value } = action.payload;

      state.isLoading = value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoading } = loadingSlice.actions;

export default loadingSlice.reducer;

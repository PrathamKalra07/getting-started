import { createSlice } from "@reduxjs/toolkit";

export const originalSignatoryWithCoordsSlice = createSlice({
  name: "originalSignatoryWithCoordsSlice",
  initialState: {
    data: {},
  },
  reducers: {
    setFullData: (currentState, action) => {
      const { data } = action.payload;
      currentState.data = data;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setFullData } = originalSignatoryWithCoordsSlice.actions;

export default originalSignatoryWithCoordsSlice.reducer;

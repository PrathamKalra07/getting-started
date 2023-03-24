import { createSlice } from "@reduxjs/toolkit";

export const coordinatesSlice = createSlice({
  name: "coordinatesSlice",
  initialState: {
    allCoordinateData: [],
  },
  reducers: {
    setCoordinateData: (state, action) => {
      const { allCoordinateData } = action.payload;
      state.allCoordinateData = allCoordinateData;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCoordinateData } = coordinatesSlice.actions;

export default coordinatesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const coordinatesSlice = createSlice({
  name: "coordinatesSlice",
  initialState: {
    allCoordinateData: [],
    recordData: {}
  },
  reducers: {
    setCoordinateData: (state, action) => {
      const { allCoordinateData } = action.payload;
      state.allCoordinateData = allCoordinateData;
    },
    setRecordData: (state, action) => {
      const { recordData } = action.payload;
      state.recordData = recordData;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setCoordinateData, setRecordData } = coordinatesSlice.actions;

export default coordinatesSlice.reducer;

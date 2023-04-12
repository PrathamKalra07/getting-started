import { createSlice, current } from "@reduxjs/toolkit";

export const checkboxSlice = createSlice({
  name: "colorsSlice",
  initialState: {
    color1: "#0b2447",
    color2: "#19376d",
    color3: "#576cbc",
    color4: "#a5d7e8",
    customBlue: "#005cb9",
  },
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = checkboxSlice.actions;

export default checkboxSlice.reducer;

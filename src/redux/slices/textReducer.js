import { createSlice } from "@reduxjs/toolkit";

export const textSlice = createSlice({
  name: "textSlice",
  initialState: {
    allTextData: [],
  },
  reducers: {
    setTextData: (state, action) => {
      const { allTextData } = action.payload;
      state.allTextData = allTextData;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTextData } = textSlice.actions;

export default textSlice.reducer;

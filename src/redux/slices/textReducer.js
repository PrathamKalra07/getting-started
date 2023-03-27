import { createSlice, current } from "@reduxjs/toolkit";

export const textSlice = createSlice({
  name: "textSlice",
  initialState: {
    allTextData: {},
  },
  reducers: {
    setTextData: (state, action) => {
      const { allTextData } = action.payload;
      state.allTextData = allTextData;
    },
    changeTextData: (state, action) => {
      const { elementIndex, textValue, currentPageNo } = action.payload;
      const tempData = current(state.allTextData)[currentPageNo];

      state.allTextData[currentPageNo] = tempData.map((item) => {
        if (elementIndex === item.index) {
          return {
            ...item,
            value: textValue,
          };
        }
        return item;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTextData, changeTextData } = textSlice.actions;

export default textSlice.reducer;

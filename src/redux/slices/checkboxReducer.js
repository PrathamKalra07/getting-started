import { createSlice, current } from "@reduxjs/toolkit";

export const checkboxSlice = createSlice({
  name: "checkboxSlice",
  initialState: {
    allCheckboxData: {},
  },
  reducers: {
    setCheckBoxData: (state, action) => {
      const { allCheckboxData } = action.payload;
      state.allCheckboxData = allCheckboxData;
    },
    changeCheckboxData: (state, action) => {
      const { elementIndex, textValue, currentPageNo } = action.payload;
      const tempData = current(state.allCheckboxData)[currentPageNo];

      state.allCheckboxData[currentPageNo] = tempData.map((item) => {
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
export const { changeCheckboxData, setCheckBoxData } = checkboxSlice.actions;

export default checkboxSlice.reducer;

import { createSlice, current } from "@reduxjs/toolkit";

export const emailSlice = createSlice({
  name: "emailSlice",
  initialState: {
    allEmailData: {},
  },
  reducers: {
    setEmailData: (state, action) => {
      const { allEmailData } = action.payload;
      state.allEmailData = allEmailData;
    },
    changeEmailData: (state, action) => {
      const { elementIndex, textValue, currentPageNo } = action.payload;
      console.log('email text value' + textValue);
      
      const tempData = current(state.allEmailData)[currentPageNo];

      state.allEmailData[currentPageNo] = tempData.map((item) => {
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
export const { setEmailData, changeEmailData } = emailSlice.actions;

export default emailSlice.reducer;

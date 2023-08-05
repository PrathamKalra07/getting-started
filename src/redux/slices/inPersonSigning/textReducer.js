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
      const { elementIndex, value, currentPageNo } = action.payload;
      const tempData = current(state.allTextData)[currentPageNo];

      console.log('@@@ changeTextData: '+ JSON.stringify(tempData));
      state.allTextData[currentPageNo] = tempData.map((item) => {
        if (elementIndex === item.id) {
          return {
            ...item,
            value: value,
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

import { createSlice, current } from "@reduxjs/toolkit";

export const picklistSlice = createSlice({
  name: "picklistSlice",
  initialState: {
    allPicklistData: {},
  },
  reducers: {
    setPicklistData: (state, action) => {
      const { allPicklistData } = action.payload;
      state.allPicklistData = allPicklistData || {};
    },
    changePicklistData: (state, action) => {
      const { elementIndex, currentPageNo, selectedValue } = action.payload;
      const tempData = current(state.allPicklistData)[currentPageNo];

      state.allPicklistData[currentPageNo] = tempData.map((item) => {
        if (elementIndex === item.index) {
          let tmp = {
            ...item,
            value: selectedValue,
          };

          return tmp;
        }
        return item;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPicklistData, changePicklistData } = picklistSlice.actions;

export default picklistSlice.reducer;

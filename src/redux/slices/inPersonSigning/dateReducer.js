import { createSlice, current } from "@reduxjs/toolkit";

export const dateSlice = createSlice({
  name: "dateSlice",
  initialState: {
    allDateData: {},
  },
  reducers: {
    setDateData: (state, action) => {
      const { allDateData } = action.payload;
      state.allDateData = allDateData;
    },
    changeDateData: (state, action) => {
      const { elementIndex, textValue, currentPageNo } = action.payload;
      console.log("changeDateData",action.payload);
      const tempData = current(state.allDateData)[currentPageNo];

      state.allDateData[currentPageNo] = tempData.map((item) => {
        if (elementIndex === item.id) {
          return {
            ...item,
            value: textValue,
          };
        }
        return item;
      });
      console.log('@@@ state.allDateData::'+state.allDateData);
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeDateData, setDateData } = dateSlice.actions;

export default dateSlice.reducer;

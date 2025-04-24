import { createSlice, current } from "@reduxjs/toolkit";
// import { changePicklistData } from "../picklistReducer";

// export const picklistSlice = createSlice({
//   name: "picklistSlice",
//   initialState: {
//     allPicklistData: {},
//   },
//   reducers: {
//     setPicklistData: (state, action) => {
//       const { allPicklistData } = action.payload;
//       state.allPicklistData = allPicklistData || {};
//     },
//     changePicklistData: (state, action) => {
//       const { elementIndex, textValue, currentPageNo } = action.payload;
//       const tempData = current(state.allPicklistData)[currentPageNo];
//       state.allPicklistData[currentPageNo] = tempData.map((item) => {
//         if (elementIndex === item.id) {
//           return {
//             ...item,
//             value: textValue,
//           };
//         }
//         return item;
//       });
//     },
//   },
// });
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
        if (elementIndex === item.id) {
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
